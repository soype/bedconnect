import { createHash } from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return new Response(JSON.stringify({ error: "Email and password are both required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const email = createHash("sha256").update(body.email).digest("hex");
    const password = createHash("sha256").update(body.password).digest("hex");
    const newToken = `${email}:${password}`;
    return new Response(JSON.stringify({ session: newToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
