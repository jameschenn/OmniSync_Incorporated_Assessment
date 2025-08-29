import { Router } from 'express';
import { getAllCards, incrementCardCount, clearAllCards } from '../controllers/cards';

const router = Router();

router.get('/', getAllCards);
router.post('/:id/click', incrementCardCount);
router.post('/clear', clearAllCards);

export default router;



