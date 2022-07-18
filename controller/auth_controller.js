import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import client from '../database.js';
import validatePassword from '../utils/validatePassword.js';
import emailValidation from '../utils/validateEmail.js';

dotenv.config();

const AuthController = {
    // create a new user - POST
    signup: async (req, res) => {
        const {email, firstname, lastname, password} = req.body

        try {
            // if submited without any of these inputs, return a status 400
            if (!email || !firstname || !lastname || !password) {
                return res.status(400).json({message: 'All fields must be provided'})
            }
            // if email fails validation criteria, return a status 400
            if(!emailValidation(email)) {
                return res.status(400).json({message: 'Enter a valid email address'})
            }
            // if password is less than 7, return a status 400
            if(password.length < 7) {
                return res.status(400).json({message: 'Password should not be less than 7 characters'})
            }
            // if password fails validation criteria, return a status 400
            if(!validatePassword(password)) {
                return res.status(400).json({message: 'Password must be alphanumeric characters'})
            }
            //Checks if user already exists --
            const findUser = await client.query(`SELECT * FROM users WHERE email = $1;`, [email]);
            const foundUser = findUser.rows

            //if user exists, return 'user already exists'
            if(foundUser.length !== 0) {
                return res.status(400).json({message: 'User already exist. Please login'})
            }

            //generating random-salt-hash.
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)

            const user = {
                email, firstname, lastname, password:hash
                //assigning the random-salt-hash to the password.
            }

            if (hash) {
                // create new user by inserting into these columns 'email, firstname, lastname, password'
                const newUser = await client.query(`INSERT INTO users (email, firstname, lastname, password) VALUES($1, $2, $3, $4)`,
                [user.email, user.firstname, user.lastname, user.password]
                )
                if (newUser){
                    jwt.sign(
                        { email: user.email},
                        process.env.SECRET,
                            {expiresIn: 3600},
                            (err, token) => {
                                if (err) {
                                    throw err
                                }
                                res.json({success:'New user has been created', data: {token: `Bearer ${token}`, firstname: user.firstname, lastname: user.lastname, email: user.email}})
                            }
                    )
                } 
            }
        } catch (err) {
            console.error(err)
        }
    },

    users: async (req, res) => {
        try {
            const users = await client.query("SELECT * FROM users");
            res.send(users.rows)
            // console.log(users.rows.length)
        } catch (err) {
            console.error(err.message)
        }
    },

    user: async (req, res) => {
        try {
            const { user_id } = req.params
            const findUser = await client.query("SELECT * FROM users WHERE user_id = $1;", [user_id]);
            const foundUser = findUser.rows
            res.send(foundUser)
        } catch (err) {
            console.error(err.message)
        }
    },

    delete: async (req, res) => {
        try {
            const { user_id } = req.params
            const deleteUser = await client.query("DELETE from users WHERE user_id = $1;", [user_id]);
            res.json({message: `user deleted`})
        } catch (err) {
            console.error(err)
        }
    }
}

export default AuthController