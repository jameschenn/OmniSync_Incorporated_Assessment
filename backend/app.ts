import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

const DB_HOST = process.env.DB_HOST || "database";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
const DB_NAME = process.env.DB_NAME || "omnisync_database";

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" })
})

export default app;