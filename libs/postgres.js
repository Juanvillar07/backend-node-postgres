const { Client } = require("pg");

async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "juan",
    password: "admin123",
    database: "my_academy",
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
