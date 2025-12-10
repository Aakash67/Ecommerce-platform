import cron from 'node-cron';
import prisma from '../lib/prisma.js';
import { sendAbandonedCartEmail } from './resendService.js';

export const startCronJobs = () => {
    // Abandoned cart email functionality disabled
    console.log('[Cron] Abandoned cart email recovery disabled');

    // Uncomment below to enable abandoned cart emails
    /*
    // Run every 15 minutes
    cron.schedule('*/15 * * * * ', async () => {
    console.log('[Cron] Running abandoned cart check...');
    const timeThreshold = new Date(Date.now() - 15 * 60 * 1000);

    try {
        const abandonedCarts = await prisma.cart.findMany({
            where: {
                status: 'active',
                lastActiveAt: {
                    lt: timeThreshold
                },
                email: {
                    not: null
                }
            }
        });

        console.log(`[Cron] Found ${abandonedCarts.length} abandoned carts.`);

        for (const cart of abandonedCarts) {
            // Fetch cart with items before sending email
            const cartWithItems = await prisma.cart.findUnique({
                where: { id: cart.id },
                include: { items: true }
            });

            // Mark as abandoned so we don't email again
            await prisma.cart.update({
                where: { id: cart.id },
                data: { status: 'abandoned' }
            });

            // Send email with cart details
            if (cart.email && cartWithItems) {
                await sendAbandonedCartEmail(cart.email, cartWithItems);
                console.log(`[Cron] Email sent to ${cart.email} for cart ${cart.id}`);
            }
        }
    } catch (error) {
        console.error('[Cron] Error in abandoned cart cron:', error);
    }
});
    */
};
