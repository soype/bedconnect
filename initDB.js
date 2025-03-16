const pool = require("./src/lib/db.js"); // Import the pool

const initDb = async () => {
  const client = await pool.connect(); // Get a client from the pool
  try {
    // Drop and recreate tables to ensure constraints are applied
    await client.query(`DROP TABLE IF EXISTS Bookings;`);
    await client.query(`DROP TABLE IF EXISTS Posts;`);
    await client.query(`DROP TABLE IF EXISTS Bookers;`);
    await client.query(`DROP TABLE IF EXISTS users;`);

    // Create tables
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS Posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          photo VARCHAR(255)
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS Bookers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE -- Add UNIQUE constraint
        );
      `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS Bookings (
          id SERIAL PRIMARY KEY,
          post_id INTEGER REFERENCES Posts(id) ON DELETE CASCADE,
          booker_id INTEGER REFERENCES Bookers(id) ON DELETE CASCADE,
          arrives DATE NOT NULL,
          leaves DATE NOT NULL
        );
      `);
    console.log("Tables created");

    // Insert dummy data
    const dummyUsers = require("./dummydata/dummyUsers.json");
    const dummyPosts = require("./dummydata/dummyPosts.json");

    for (const user of dummyUsers) {
      await client.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
        user.email,
        user.password,
      ]);
    }

    for (const post of dummyPosts) {
      const postRes = await client.query(
        `INSERT INTO Posts (title, photo) VALUES ($1, $2) RETURNING id;`,
        [post.title, post.photo]
      );
      const postId = postRes.rows[0].id;

      for (const booking of post.booked) {
        // Insert booker
        const bookerRes = await client.query(
          `INSERT INTO Bookers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id;`,
          [booking.booker]
        );
        const bookerId = bookerRes.rows[0]?.id || (
          await client.query(`SELECT id FROM Bookers WHERE name = $1;`, [booking.booker])
        ).rows[0].id;
        console.log(`Booker ID for ${booking.booker}:`, bookerId);

        // Insert booking
        await client.query(
          `INSERT INTO Bookings (post_id, booker_id, arrives, leaves) VALUES ($1, $2, $3, $4);`,
          [postId, bookerId, booking.arrives, booking.leaves]
        );
      }
    }

    // Query and log results
    const res = await client.query(`
        SELECT p.title, b.name, bk.arrives, bk.leaves
        FROM Bookings bk
        JOIN Posts p ON bk.post_id = p.id
        JOIN Bookers b ON bk.booker_id = b.id;
      `);
    console.log("Query results:");
    console.table(res.rows);

    console.log("Dummy data inserted");
  } catch (error) {
    console.error("Error initializing the database:", error);
  } finally {
    client.release(); // Release the client back to the pool
  }
};

initDb();