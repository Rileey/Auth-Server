import pkg from pkg;
import dotenv from 'dotenv';
const { Client } = pkg;

dotenv.config();

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: `${DATABASEPASSWORD}`,
    connectionLimit: 10,
    database: 'AbbeyBank'
})

export default client