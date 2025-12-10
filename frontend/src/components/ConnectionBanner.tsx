import { AlertCircle } from 'lucide-react';

interface ConnectionBannerProps {
    isConnected: boolean;
}

export default function ConnectionBanner({ isConnected }: ConnectionBannerProps) {
    if (isConnected) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
            <div className="backdrop-blur-md bg-red-500/90 border border-red-600/50 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 text-white">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm font-medium">
                    Connection lost. Attempting to reconnect...
                </div>
            </div>
        </div>
    );
}
