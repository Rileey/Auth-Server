import pkg from 'pg';
import dotenv from 'dotenv';
const { Client } = pkg;

dotenv.config();

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: `${process.env.DATABASEPASSWORD}`,
    connectionLimit: 10,
    database: 'AbbeyBank'
})

export default client