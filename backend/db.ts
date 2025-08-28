import pkg from "pg";
const { Pool } = pkg;

const DB_HOST = process.env.DB_HOST || "database";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
const DB_NAME = process.env.DB_NAME || "omnisync_database";

export const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export const initDB = async () => {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS "Cards" (
        id SERIAL PRIMARY KEY,
        clicks INT NOT NULL DEFAULT 0,
        "firstClick" TIMESTAMP NULL
        );
    `);

    const { rows } = await pool.query('SELECT COUNT(*) AS count FROM "Cards";');
    if (parseInt(rows[0].count, 10) === 0) {
        await pool.query(`
            INSERT INTO "Cards" (clicks, "firstClick") VALUES
            (0, NULL),
            (0, NULL),
            (0, NULL),
            (0, NULL),
            (0, NULL),
            (0, NULL),
            (0, NULL),
            (0, NULL);
        `);
        console.log("Seeded 'Cards' table with initial rows.");
    } else {
        console.log("'Cards' table already has data. Skipping seed.");
    }
};
