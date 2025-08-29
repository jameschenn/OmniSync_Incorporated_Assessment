import type { Request, Response } from 'express';
import { pool } from '../db';

export const getAllCards = async (_req: Request, res: Response): Promise<void> => {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM "Cards"
            ORDER BY 
                CASE WHEN "firstClick" IS NULL THEN 1 ELSE 0 END,
                "firstClick" ASC;
        `);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Error fecthing cards:", err);
        res.status(500).json({ error: "Failed to fetch cards on the backend" })
    }
};

export const incrementCardCount = async (req: Request, res: Response): Promise<void> => {
    
    const { id } = req.params;
    
    try {
        const card = await pool.query(`
            UPDATE "Cards"
            SET clicks = clicks + 1, 
                "firstClick" = COALESCE("firstClick", NOW())
            WHERE id = $1
            RETURNING *;    
        `, [id]);
        
        if(card.rows.length === 0) {
            res.status(404).json({ error: "Card not found" });
            return;
        }

        res.status(200).json(card.rows[0]);

    } catch (err) {
        console.error("Error incrementing card:", err);
        res.status(500).json({ error: "Failed to update card from the backend" });
    }
} 

export const clearAllCards = async (_req: Request, res: Response): Promise<void> => {
    try {
        const { rows } = await pool.query(`
            UPDATE "Cards"
            SET clicks = 0,
                "firstClick" = NULL
            RETURNING *;
        `);

        res.status(200).json(rows);

    } catch (err) {
        console.error("Error clearing cards:", err);
        res.status(500).json({ error: "Failed to clear cards from the backend" });
    }
}