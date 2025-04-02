const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => {
        console.log("✅ Successfully connected to Neon PostgreSQL!");
        pool.end();
    })
    .catch(err => console.error("❌ Connection failed:", err));
