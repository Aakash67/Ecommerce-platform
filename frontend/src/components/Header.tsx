import { ShoppingCart, Menu, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cart } = useCart();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0070FF] to-[#7DF9FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0070FF]/30 group-hover:shadow-[#0070FF]/50 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              TechStore
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
            <Link to="/checkout">
              <button className="relative p-2 text-white/70 hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cart?.items?.length ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0070FF] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {cart.items.length}
                  </span>
                ) : null}
              </button>
            </Link>
            <Button className="hidden md:flex bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] text-white border-0 hover:shadow-lg hover:shadow-[#0070FF]/30 transition-all">
              Sign In
            </Button>
            <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;