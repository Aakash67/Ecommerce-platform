import express from 'express';
import { createOrGetCart, addItem, checkout } from '../controllers/cartController.js';
import { processReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.post('/', createOrGetCart);
router.post('/items', addItem);
// Email route removed - guest checkout disabled
// router.post('/email', updateEmail);
router.post('/checkout', checkout);
router.post('/receipt', processReceipt);

export default router;
