import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'db',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
});