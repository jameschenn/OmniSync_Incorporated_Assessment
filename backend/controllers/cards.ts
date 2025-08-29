import type { Request, Response } from 'express';
import { pool } from '../db';

export const getAllCards = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM "Cards"
            ORDER BY id ASC;
        `);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error fecthing cards:", err);
        res.status(500).json({ error: "Failed to fetch cards" })
    }
}