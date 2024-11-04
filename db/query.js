const pool = require('./pool');

async function getSomeElements() {
    const  { rows } = await pool.query('SELECT * FROM artists');
    console.log(rows);
}
getSomeElements()