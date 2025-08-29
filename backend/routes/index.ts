import { Router, Request, Response } from 'express';
import cardRoutes from './cards';

const router = Router();

router.use('/cards', cardRoutes);

export default router;
