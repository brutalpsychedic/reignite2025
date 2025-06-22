const { Client } = require("pg");

exports.handler = async (event) => {
  const { name, email } = JSON.parse(event.body);

  const client = new Client({
    connectionString: "your_neon_postgres_connection_url",
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query("INSERT INTO registrations (name, email) VALUES ($1, $2)", [name, email]);
    return {
      statusCode: 200,
      body: "Registration successful!",
    };
  } catch (err) {
    console.error("DB Error:", err);
    return {
      statusCode: 500,
      body: "Registration failed. Try again later.",
    };
  } finally {
    await client.end();
  }
};
