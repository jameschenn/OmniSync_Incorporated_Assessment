import { Router } from 'express';
import { getAllCards } from '../controllers/cards';

const router = Router();

router.get('/', getAllCards);

export default router;



