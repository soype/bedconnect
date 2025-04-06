const pool = require("./src/lib/db.js");
const bcrypt = require("bcrypt");

const initDb = async () => {
  const client = await pool.connect(); 
  try {
    await client.query(`DROP TABLE IF EXISTS Bookings CASCADE`);
    await client.query(`DROP TABLE IF EXISTS Posts CASCADE`);
    await client.query(`DROP TABLE IF EXISTS Bookers CASCADE`);
    await client.query(`DROP TABLE IF EXISTS sessions CASCADE`);
    await client.query(`DROP TABLE IF EXISTS users CASCADE`);

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        verification_token VARCHAR(64),
        verified BOOLEAN DEFAULT false,
        permissions VARCHAR(255)[],
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        code VARCHAR(10) NOT NULL UNIQUE,
        provider VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        cost DECIMAL(10, 2) NOT NULL,
        priceA DECIMAL(10, 2) NOT NULL,
        priceB DECIMAL(10, 2) NOT NULL,
        priceC DECIMAL(10, 2),
        priceD DECIMAL(10, 2),
        priceE DECIMAL(10, 2),
        priceNG DECIMAL(10, 2),
        priceP DECIMAL(10, 2),
        costoVital DECIMAL(10, 2),
        costoNG DECIMAL(10, 2),
        volume DECIMAL(10, 2) NOT NULL,
        criticalStock INT NOT NULL,
        gluten BOOLEAN DEFAULT false,
        vegan BOOLEAN DEFAULT false,
        organic BOOLEAN DEFAULT false,
        keto BOOLEAN DEFAULT false,
        kosher BOOLEAN DEFAULT false,
        aplv BOOLEAN DEFAULT false,
        nosugar BOOLEAN DEFAULT false,
        noconservants BOOLEAN DEFAULT false,
        expireTime INT,
        description TEXT,
        image VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(64) NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE Posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        photo VARCHAR(255),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await client.query(`
      CREATE TABLE Bookers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    await client.query(`
      CREATE TABLE Bookings (
        id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES Posts(id) ON DELETE CASCADE,
        booker_id INTEGER REFERENCES Bookers(id) ON DELETE CASCADE,
        arrives DATE NOT NULL,
        leaves DATE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    console.log("Tables created");

    const dummyUsers = require("./dummydata/dummyUsers.json");
    const dummyPosts = require("./dummydata/dummyPosts.json");

    for (const user of dummyUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await client.query(
        `INSERT INTO users (email, password) VALUES ($1, $2)`,
        [user.email.toLowerCase().trim(), hashedPassword]
      );
    }

    for (const post of dummyPosts) {
      const user = await client.query(`SELECT id FROM users LIMIT 1`);
      const postRes = await client.query(
        `INSERT INTO Posts (title, photo, user_id) VALUES ($1, $2, $3) RETURNING id`,
        [post.title, post.photo, user.rows[0].id]
      );
      const postId = postRes.rows[0].id;

      for (const booking of post.booked) {
        const bookerRes = await client.query(
          `INSERT INTO Bookers (name) VALUES ($1) 
           ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name 
           RETURNING id`,
          [booking.booker]
        );
        
        await client.query(
          `INSERT INTO Bookings (post_id, booker_id, arrives, leaves)
           VALUES ($1, $2, $3, $4)`,
          [postId, bookerRes.rows[0].id, booking.arrives, booking.leaves]
        );
      }
    }

    console.log("Dummy data inserted");
  } catch (error) {
    console.error("Error initializing the database:", error);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
};

initDb();