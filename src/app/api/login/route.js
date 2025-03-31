const pool = require("@/lib/db.js");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const { randomBytes } = require('crypto'); // Proper crypto import

export async function POST(request) {
  let client;
  try {
    client = await pool.connect();
    const body = await request.json();

    // Input validation
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

    // Find user in database
    const userResult = await client.query(
      `SELECT id, password FROM users WHERE email = $1`,
      [body.email.toLowerCase().trim()]
    );

    if (userResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = userResult.rows[0];
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Secure token generation
    const sessionToken = randomBytes(32).toString('hex'); // Now using properly imported crypto

    return new Response(
      JSON.stringify({ 
        userId: user.id,
        token: sessionToken
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
        } 
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    if (client) client.release();
  }
}