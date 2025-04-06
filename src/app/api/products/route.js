import pool from "@/lib/db";

export async function GET() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query(`SELECT * FROM products`);
        return Response.json(rows); // Simplified response
    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}