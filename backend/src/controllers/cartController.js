import prisma from '../lib/prisma.js';

export const createOrGetCart = async (req, res) => {
    const { cartId, email } = req.body;

    try {
        let cart;
        if (cartId) {
            console.log(`[Cart] Fetching cart: ${cartId}`);
            cart = await prisma.cart.findUnique({
                where: { id: cartId },
                include: { items: true },
            });
        }

        if (!cart) {
            console.log('[Cart] Creating new cart');
            cart = await prisma.cart.create({
                data: {
                    email: email || null,
                    status: 'active',
                },
                include: { items: true },
            });
            console.log(`[Cart] New cart created: ${cart.id}`);
        } else {
            console.log(`[Cart] Updating existing cart: ${cart.id}`);
            // Update last active
            await prisma.cart.update({
                where: { id: cart.id },
                data: { lastActiveAt: new Date(), status: 'active' }
            });
        }

        res.json(cart);
    } catch (error) {
        console.error('[Cart] Error in createOrGetCart:', error);
        res.status(500).json({ error: error.message, details: 'Failed to create or fetch cart' });
    }
};

export const updateEmail = async (req, res) => {
    const { cartId, email } = req.body;

    if (!cartId || !email) {
        return res.status(400).json({ error: 'cartId and email are required' });
    }

    try {
        const cart = await prisma.cart.update({
            where: { id: cartId },
            data: { email, lastActiveAt: new Date() },
            include: { items: true }
        });
        console.log(`[Cart] Email updated for cart ${cartId}: ${email}`);
        res.json(cart);
    } catch (error) {
        console.error('[Cart] Error updating email:', error);
        res.status(500).json({ error: error.message, details: 'Failed to update email' });
    }
};

export const addItem = async (req, res) => {
    const { cartId, productId, quantity, price } = req.body;

    if (!cartId || !productId || !quantity || !price) {
        return res.status(400).json({ error: 'cartId, productId, quantity, and price are required' });
    }

    try {
        console.log(`[Cart] Adding item to cart ${cartId}: ${productId} x${quantity}`);

        // Ensure cart exists/active
        await prisma.cart.update({
            where: { id: cartId },
            data: { lastActiveAt: new Date(), status: 'active' }
        });

        // Check if item exists in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: { cartId, productId }
        });

        let item;
        if (existingItem) {
            console.log(`[Cart] Updating existing item quantity`);
            item = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            });
        } else {
            console.log(`[Cart] Creating new item`);
            item = await prisma.cartItem.create({
                data: { cartId, productId, quantity, price }
            });
        }

        const updatedCart = await prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true }
        });
        console.log(`[Cart] Cart updated successfully with ${updatedCart.items.length} items`);
        res.json(updatedCart);
    } catch (error) {
        console.error('[Cart] Error adding item:', error);
        res.status(500).json({ error: error.message, details: 'Failed to add item to cart' });
    }
};

export const checkout = async (req, res) => {
    const { cartId } = req.body;

    if (!cartId) {
        return res.status(400).json({ error: 'cartId is required' });
    }

    try {
        console.log(`[Cart] Processing checkout for cart: ${cartId}`);
        const cart = await prisma.cart.update({
            where: { id: cartId },
            data: { status: 'completed', lastActiveAt: new Date() },
            include: { items: true }
        });
        console.log(`[Cart] Checkout completed for cart: ${cartId}`);
        res.json({ success: true, cart });
    } catch (error) {
        console.error('[Cart] Error during checkout:', error);
        res.status(500).json({ error: error.message, details: 'Failed to complete checkout' });
    }
};
