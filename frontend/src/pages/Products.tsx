import { useState } from 'react';
import { Search, SlidersHorizontal, Star, ShoppingBag, TrendingUp, Zap, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';

import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Products = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Audio', 'Gaming', 'VR', 'Accessories'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0070FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7DF9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our Products
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Discover cutting-edge technology and premium electronics for every need
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0070FF]/50 focus:border-transparent transition-all"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${selectedCategory === category
                  ? 'bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] text-white shadow-lg shadow-[#0070FF]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-white/60">
              Showing {filteredProducts.length} products
            </p>
            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0070FF]/50">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} by Design_Nation on Pixabay`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[#0070FF] text-white">
                      {product.badge}
                    </div>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium bg-black/50 backdrop-blur-sm text-white">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-white group-hover:text-[#7DF9FF] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#0070FF] text-[#0070FF]" />
                        <span className="text-sm font-medium text-white">{product.rating}</span>
                      </div>
                      <span className="text-xs text-white/50">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded bg-white/5 text-white/70">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] text-white border-0 hover:shadow-lg hover:shadow-[#0070FF]/30"
                        onClick={() => {
                          addToCart(product.id.toString(), product.price);
                          toast.success(`${product.name} added to cart`);
                        }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Latest Technology',
                description: 'Always stay ahead with the newest tech innovations and products.'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Every product is carefully selected and tested for excellence.'
              },
              {
                icon: Zap,
                title: 'Fast Shipping',
                description: 'Get your orders delivered quickly with express shipping options.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0070FF] to-[#7DF9FF] flex items-center justify-center shadow-lg shadow-[#0070FF]/30">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;