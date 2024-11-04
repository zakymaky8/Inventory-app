const { Pool } = require( 'pg' );
require("dotenv").config();

const { DB_PORT, USER, PASSWORD, HOSTNAME, DATABASE_NAME } = process.env;

module.exports = new Pool({
    user: USER,
    password: PASSWORD,
    host: HOSTNAME,
    database: DATABASE_NAME,
    port: DB_PORT
})