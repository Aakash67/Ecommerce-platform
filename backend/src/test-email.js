import { sendAbandonedCartEmail } from './services/resendService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('=== Email Configuration Test ===\n');

// Check environment variables
console.log('Environment Variables:');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Set (length: ' + process.env.RESEND_API_KEY.length + ')' : '❌ Not set');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
console.log();

// Test email sending
const testEmail = process.argv[2] || 'test@example.com';

// Create a mock cart with items
const mockCart = {
    id: 'test-cart-123',
    items: [
        { productId: '1', quantity: 2, price: 299.99 },
        { productId: '2', quantity: 1, price: 149.99 },
        { productId: '5', quantity: 1, price: 179.99 }
    ]
};

console.log(`Testing email send to: ${testEmail}`);
console.log(`Cart Items: ${mockCart.items.length} products`);
console.log();

try {
    const result = await sendAbandonedCartEmail(testEmail, mockCart);
    console.log('\n=== Test Complete ===');
    if (result) {
        console.log('✅ Email sent successfully!');
        console.log('📧 Check your inbox to see the beautiful email template!');
    } else {
        console.log('❌ Email failed to send');
    }
} catch (error) {
    console.error('\n❌ Test failed with error:', error);
}

process.exit(0);
