import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
}

interface Cart {
    id: string;
    status: string;
    items: CartItem[];
    email?: string;
}

interface CartContextType {
    cart: Cart | null;
    addToCart: (productId: string, price: number) => Promise<void>;
    // updateEmail removed - guest checkout disabled
    checkout: () => Promise<void>;
    loading: boolean;
    isConnected: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true);

    // Load existing cart from local storage or create new
    useEffect(() => {
        const initCart = async () => {
            setLoading(true);
            const savedId = localStorage.getItem('cartId');

            try {
                // First check connectivity
                try {
                    const healthRes = await fetch(`${API_BASE_URL.replace('/api', '')}/`);
                    if (healthRes.ok) setIsConnected(true);
                    else setIsConnected(false);
                } catch (e) {
                    setIsConnected(false);
                    console.error("Backend not reachable");
                }

                const res = await fetch(`${API_BASE_URL}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartId: savedId })
                });
                if (!res.ok) throw new Error('Failed to fetch cart');

                const data = await res.json();
                setCart(data);
                if (data.id) localStorage.setItem('cartId', data.id);
            } catch (err) {
                console.error("Failed to init cart", err);
            } finally {
                setLoading(false);
            }
        };

        initCart();
    }, []);

    const addToCart = async (productId: string, price: number) => {
        if (!cart) return;

        const maxRetries = 3;
        let retries = 0;

        while (retries < maxRetries) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

                const res = await fetch(`${API_BASE_URL}/cart/items`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cartId: cart.id,
                        productId,
                        quantity: 1,
                        price
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const updatedCart = await res.json();
                setCart(updatedCart);
                setIsConnected(true);
                return; // Success, exit retry loop
            } catch (err) {
                console.error(`Attempt ${retries + 1} failed:`, err);
                retries++;

                if (retries >= maxRetries) {
                    console.error('Max retries reached for addToCart');
                    setIsConnected(false);
                    throw err;
                }

                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
            }
        }
    };

    // Guest checkout disabled - updateEmail function removed
    /*
    const updateEmail = async (email: string) => {
        if (!cart) return;

        const maxRetries = 3;
        let retries = 0;

        while (retries < maxRetries) {
            try {
                console.log('Sending email update to backend:', email);
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const res = await fetch(`${API_BASE_URL}/cart/email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartId: cart.id, email }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const updatedCart = await res.json();
                setCart(updatedCart);
                setIsConnected(true);
                return;
            } catch (err) {
                console.error(`Email update attempt ${retries + 1} failed:`, err);
                retries++;

                if (retries >= maxRetries) {
                    console.error('Max retries reached for updateEmail');
                    setIsConnected(false);
                    throw err;
                }

                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
            }
        }
    };
    */


    const checkout = async () => {
        if (!cart) return;

        const maxRetries = 3;
        let retries = 0;

        while (retries < maxRetries) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000);

                const res = await fetch(`${API_BASE_URL}/cart/checkout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartId: cart.id }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                if (data.success) {
                    setCart(null);
                    localStorage.removeItem('cartId');
                }
                setIsConnected(true);
                return;
            } catch (err) {
                console.error(`Checkout attempt ${retries + 1} failed:`, err);
                retries++;

                if (retries >= maxRetries) {
                    console.error('Max retries reached for checkout');
                    setIsConnected(false);
                    throw err;
                }

                await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
            }
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, checkout, loading, isConnected }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
