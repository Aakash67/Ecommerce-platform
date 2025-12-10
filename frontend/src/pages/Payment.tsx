import { useEffect, useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Payment = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-6 pt-24">
                {/* Vibrant Background Orbs (Mirrored from Checkout for consistency) */}
                <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative w-full max-w-lg">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8 text-white relative">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-6">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-t-4 border-pink-500 rounded-full animate-spin"></div>
                                    <div className="absolute inset-2 border-t-4 border-cyan-500 rounded-full animate-spin animation-delay-150"></div>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold">Secure Gateway</h2>
                                    <p className="text-blue-200/50 text-sm mt-1">Initializing encryption parameters...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">Payment Details</h1>
                                        <p className="text-blue-200/50 text-sm">Complete your purchase securely</p>
                                    </div>
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                {/* Dummy Card Preview */}
                                <div className="relative h-48 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 shadow-lg transform transition hover:scale-[1.02] duration-300">
                                    <div className="absolute top-0 right-0 p-6 opacity-20">
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg>
                                    </div>
                                    <div className="flex flex-col justify-between h-full relative z-10">
                                        <div className="text-xs text-white/70 tracking-widest uppercase">Current Method</div>
                                        <div className="font-mono text-2xl tracking-widest text-white text-shadow">
                                            •••• •••• •••• 4242
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-[10px] text-white/70 uppercase">Card Holder</div>
                                                <div className="font-medium tracking-wide">GUEST USER</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-white/70 uppercase">Expires</div>
                                                <div className="font-medium tracking-wide">12/28</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                                    <span>Pay Now</span>
                                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">$0.00</span>
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-green-400 font-medium">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>High-grade 256-bit SSL encryption active</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Payment;
