import app from './app';
import dotenv from 'dotenv';
import { pool, initDB } from './db';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5050;

(async () => {
  try {
    // await pool.connect();
    await initDB();
    console.log("Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Connecting to database failed:", err);
    process.exit(1);
  }
})();
