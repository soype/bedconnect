const pool = require("@/lib/db.js");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator"); 

export async function POST(request) {
  let client;
  try {
    client = await pool.connect();
    const body = await request.json();

    if (!body.email || !body.password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isEmail(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userExists = await client.query(
      `SELECT id FROM users WHERE email = $1;`,
      [body.email.toLowerCase().trim()]
    );

    if (userExists.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const res = await client.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;`,
      [body.email.toLowerCase().trim(), hashedPassword]
    );

    return new Response(
      JSON.stringify({ session: res.rows[0].id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (client) client.release();
  }
}