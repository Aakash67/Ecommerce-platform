
// Mock Tensorlake Service since no official Node SDK exists
// and we are simulating the integration.

const TENSORLAKE_API_URL = process.env.TENSORLAKE_API_URL || 'https://api.tensorlake.ai/v1/events';
const TENSORLAKE_API_KEY = process.env.TENSORLAKE_API_KEY || 'dummy_key';

export const trackEvent = async (eventName, properties = {}) => {
    console.log(`[Tensorlake] Tracking event: ${eventName}`, properties);

    if (process.env.NODE_ENV === 'test' || !process.env.TENSORLAKE_API_KEY) {
        return; // Skip actual network call if no key or in test
    }

    try {
        const response = await fetch(TENSORLAKE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TENSORLAKE_API_KEY}`
            },
            body: JSON.stringify({
                event: eventName,
                properties: properties,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            console.error(`[Tensorlake] Failed to track event: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`[Tensorlake] Error tracking event:`, error);
    }
};
