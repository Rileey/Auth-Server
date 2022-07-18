import express from 'express';
import cors from 'cors';
import client from './database.js'
import userRoute from './route/user_route.js'
import dotenv from 'dotenv' 

export const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    parameterLimit: 1000000,
    extended: false
}));

//route
app.use('/api', userRoute);



app.get('/', (req, res) => {
  return res.json({message: `We are Live!`})
})

client.connect()
let port = process.env.PORT
if (port == null || port == ''){
  port = 8000
}
app.listen(port, () => {
    console.log(`Server is now listening in port ${port}`)
})

console.log("Client connected")

