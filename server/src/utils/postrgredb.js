const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({     
  user: 'postgres', // Default is 'postgres'
  host: 'localhost',
  database: 'urlshortner',
  password: '12345',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;