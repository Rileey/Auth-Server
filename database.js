import pkg from 'pg';
import dotenv from 'dotenv';
const { Client } = pkg;

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    port: 5432,
    password: `${process.env.DATABASEPASSWORD}`,
    connectionLimit: 10,
    database: `${process.env.DATABASE}`
})

export default client