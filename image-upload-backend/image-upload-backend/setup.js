const pool = require('./db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
  );
`;

pool.query(createTableQuery)
  .then(() => {
    console.log("✅ Table created successfully!");
    pool.end();
  })
  .catch((err) => console.error("❌ Error creating table:", err));
