import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Resend with better logging
let resend = null;
if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
    console.log('[Email] Resend initialized with API key');
} else {
    console.warn('[Email] No RESEND_API_KEY found, will use Ethereal fallback');
}

// Fallback transporter for Ethereal
let testTransporter = null;

const getTransporter = async () => {
    if (testTransporter) return testTransporter;
    const testAccount = await nodemailer.createTestAccount();
    testTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    console.log(`[Email] Ethereal test account created: ${testAccount.user}`);
    return testTransporter;
};

export const sendAbandonedCartEmail = async (email, cart) => {
    if (!email) {
        console.warn('[Email] No email provided, skipping');
        return;
    }

    console.log(`[Email] Attempting to send abandoned cart email to ${email}`);

    const cartUrl = `http://localhost:5173/checkout?cartId=${cart.id}`;
    const emailSubject = '🛒 You left something awesome behind!';

    // Import products data
    const { products } = await import('../data/products.js');

    // Build cart items HTML with product details
    let cartItemsHtml = '';
    let totalAmount = 0;

    if (cart.items && cart.items.length > 0) {
        cart.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const itemTotal = product.price * item.quantity;
                totalAmount += itemTotal;

                cartItemsHtml += `
                    <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid #eee;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td width="100" style="vertical-align: top;">
                                        <img src="${product.image}" alt="${product.name}" 
                                             style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;">
                                    </td>
                                    <td style="vertical-align: top; padding-left: 15px;">
                                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                                            ${product.name}
                                        </h3>
                                        <p style="margin: 0; color: #666; font-size: 14px;">
                                            Quantity: ${item.quantity}
                                        </p>
                                        <p style="margin: 8px 0 0 0; font-size: 18px; font-weight: 700; color: #8b5cf6;">
                                            $${itemTotal.toFixed(2)}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                `;
            }
        });
    }

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Cart is Waiting</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                                    ✨ Antigravity
                                </h1>
                                <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                                    Your cart is still here!
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                                    Don't miss out! 🎁
                                </h2>
                                <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                                    You left some amazing items in your cart. They're still available and waiting for you!
                                </p>
                                
                                <!-- Cart Items -->
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                                    ${cartItemsHtml}
                                </table>
                                
                                <!-- Total -->
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px;">
                                    <tr>
                                        <td>
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td style="font-size: 18px; font-weight: 600; color: #1a1a1a;">
                                                        Total Amount:
                                                    </td>
                                                    <td align="right" style="font-size: 28px; font-weight: 700; color: #8b5cf6;">
                                                        $${totalAmount.toFixed(2)}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- CTA Button -->
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px;">
                                    <tr>
                                        <td align="center">
                                            <a href="${cartUrl}" 
                                               style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 30px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                                                🛍️ Complete Your Purchase
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 30px 0 0 0; color: #999; font-size: 14px; text-align: center;">
                                    This is a limited-time offer. Items may sell out!
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                                <p style="margin: 0; color: #666; font-size: 14px;">
                                    <strong style="color: #1a1a1a;">Antigravity</strong> - Premium Tech Store
                                </p>
                                <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
                                    Questions? Reply to this email - we're here to help! 💜
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    try {
        // 1. Try Resend if configured
        if (resend) {
            console.log('[Email] Using Resend API...');
            const { data, error } = await resend.emails.send({
                from: 'Antigravity <onboarding@resend.dev>',
                to: [email],
                subject: emailSubject,
                html: emailHtml,
            });

            if (error) {
                console.error('[Email] Resend API error:', JSON.stringify(error, null, 2));
                console.log('[Email] Falling back to Ethereal...');
                // Fallthrough to fallback
            } else {
                console.log('[Email] ✅ Email sent successfully via Resend!', data);
                return data;
            }
        }

        // 2. Fallback to Ethereal
        console.log('[Email] Using Ethereal fallback...');
        const transporter = await getTransporter();
        const info = await transporter.sendMail({
            from: '"Antigravity Store" <no-reply@antigravity.com>',
            to: email,
            subject: emailSubject,
            html: emailHtml,
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`[Email] ✅ Email sent via Ethereal!`);
        console.log(`[Email] Preview URL: ${previewUrl}`);
        return info;

    } catch (err) {
        console.error('[Email] ❌ Error sending email:', err);
        console.error('[Email] Error details:', err.message);
        if (err.response) {
            console.error('[Email] Response:', err.response);
        }
        return null;
    }
};
