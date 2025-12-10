import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GuestCheckout = () => {
    const { updateEmail, cart } = useCart();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        if (!cart) {
            setStatus('error');
            setMessage('Your cart is empty.');
            return;
        }

        try {
            await updateEmail(email);
            // Optionally track event here if needed, or let backend do it
            navigate('/payment');
        } catch (error) {
            setStatus('error');
            setMessage('Connection failed.');
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-6 pt-24">
                {/* Vibrant Background Orbs */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="relative w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
                    {/* Cart Summary */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-6 text-white animate-in slide-in-from-left duration-500">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="bg-gradient-to-r from-pink-500 to-violet-500 w-8 h-8 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4 text-white" />
                            </span>
                            Order Summary
                        </h2>

                        {!cart?.items?.length ? (
                            <div className="text-center py-8 text-white/50">
                                Your cart is empty
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.items.map((item) => {
                                    const product = products.find(p => p.id.toString() === item.productId);
                                    if (!product) return null;
                                    return (
                                        <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-black/20 border border-white/5">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-white/90 truncate">{product.name}</h3>
                                                <div className="flex justify-between items-center mt-1">
                                                    <p className="text-sm text-white/60">Qty: {item.quantity}</p>
                                                    <p className="font-semibold text-pink-400">${item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-white/60">Total Amount</span>
                                    <span className="text-xl font-bold text-white">
                                        ${cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Guest Checkout Form */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-8 text-white animate-in zoom-in duration-500">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                Guest Checkout
                            </h1>
                            <p className="text-blue-100/70 mt-2 text-sm">
                                Enter your email to proceed
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-blue-100">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all hover:bg-black/30"
                                />
                            </div>

                            {message && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full group relative overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <div className="relative bg-[#0f172a] hover:bg-opacity-90 transition-colors rounded-xl px-6 py-3.5 flex items-center justify-center gap-2">
                                    <span className="font-semibold text-white">
                                        {status === 'loading' ? 'Processing...' : 'Continue to Payment'}
                                    </span>
                                    {!status && <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />}
                                </div>
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-blue-200/50">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Secure Encrypted Session</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GuestCheckout;
