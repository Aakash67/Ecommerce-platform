
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { trackEvent } from '../services/tensorlake.js';

const router = express.Router();
const prisma = new PrismaClient();

// Start Guest Checkout
router.post('/guest', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Create a new cart or find an existing active session(simplified for demo: always create new or update recent?)
        // For simplicity, we create a new cart for this session
        const cart = await prisma.cart.create({
            data: {
                email,
                status: 'active',
                lastActiveAt: new Date()
            }
        });

        // Track Event
        await trackEvent('guest_checkout_started', {
            cartId: cart.id,
            email: email
        });

        res.json({ cartId: cart.id, message: 'Guest checkout started' });
    } catch (error) {
        console.error('Error starting guest checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Cart Activity (Heartbeat or Item Add) - Helper to keep cart 'active'
router.post('/heartbeat/:cartId', async (req, res) => {
    const { cartId } = req.params;
    try {
        await prisma.cart.update({
            where: { id: cartId },
            data: { lastActiveAt: new Date() }
        });
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ error: 'Cart not found' });
    }
});

export default router;
