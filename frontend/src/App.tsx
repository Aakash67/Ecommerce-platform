import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import { Toaster } from 'sonner';
import ConnectionBanner from './components/ConnectionBanner';
import { useCart } from './context/CartContext';
import './App.css';

function App() {
  const { isConnected } = useCart();

  return (
    <Router>
      <ConnectionBanner isConnected={isConnected} />
      <Toaster position="bottom-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Guest checkout route removed */}
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
