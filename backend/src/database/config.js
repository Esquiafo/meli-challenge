import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_database',
    password: 'mysecretpassword',
    port: 5432,
});