const pool = require("@/lib/db.js");

export async function GET(request) {
  let client;
  try {
    client = await pool.connect();
    const posts = await client.query(`SELECT * FROM Posts;`);
    return new Response(JSON.stringify(posts.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    if (client) client.release();
  }
}