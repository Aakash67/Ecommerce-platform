import { ArrowRight, ShoppingBag, Rocket, ShieldCheck, Bolt, Headphones, Star, Zap, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: "1",
      name: 'Premium Wireless Headphones',
      price: 299,
      image: 'https://pixabay.com/get/g1c64d68541988122d6c5b0f490f39113a5241dcd65e580df6d70784a9833ef76e0fb0455966100415fcd37648cc42463.jpg',
      rating: 4.8,
      reviews: 1243,
      badge: 'Bestseller'
    },
    {
      id: "2",
      name: 'Smart Gaming Mouse',
      price: 149,
      image: 'https://pixabay.com/get/gd2b6d19f40a109668bac7ae096745dfa08dbcd34c240b25bca46780f7c385bb16267e9cdbdcb3a16b2f611fbdb097885.png',
      rating: 4.9,
      reviews: 892,
      badge: 'New'
    },
    {
      id: "3",
      name: 'VR Headset Pro',
      price: 499,
      image: 'https://pixabay.com/get/g1c64d68541988122d6c5b0f490f39113a5241dcd65e580df6d70784a9833ef76e0fb0455966100415fcd37648cc42463.jpg',
      rating: 4.7,
      reviews: 567,
      badge: 'Hot'
    },
    {
      id: "4",
      name: 'RGB Gaming Keyboard',
      price: 199,
      image: 'https://pixabay.com/get/g50e018c7d2428cdc692893d6f7add9a319a01645c290dfc37345ac176a3c54bdffc2079c5dd95d45f97db2839f9df301.png',
      rating: 4.6,
      reviews: 1056,
      badge: 'Featured'
    }
  ];

  const features = [
    {
      icon: Bolt,
      title: 'Lightning Fast Delivery',
      description: 'Get your tech gadgets delivered within 24-48 hours with our express shipping.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Shop with confidence using our encrypted payment gateway and buyer protection.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our expert team is always ready to help you with any questions or concerns.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every product is carefully selected and tested to meet our high standards.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '1000+', label: 'Products' },
    { value: '99.9%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0070FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7DF9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#1560BD] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0070FF]/10 border border-[#0070FF]/20 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-[#7DF9FF]" />
                <span className="text-sm font-medium text-white/90">New Arrivals Every Week</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  Premium Tech
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#0070FF] via-[#7DF9FF] to-[#0070FF] bg-clip-text text-transparent">
                  For Everyone
                </span>
              </h1>

              <p className="text-lg text-white/60 max-w-xl">
                Discover the latest in cutting-edge technology. From gaming gear to smart devices,
                we bring you the future of innovation at unbeatable prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/checkout">
                  <Button className="group bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] text-white border-0 hover:shadow-lg hover:shadow-[#0070FF]/30 transition-all px-8 py-6 text-base">
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-in fade-in slide-in-from-bottom-8 duration-700 animation-delay-150">
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-8">
                <img
                  src="https://pixabay.com/get/g1c64d68541988122d6c5b0f490f39113a5241dcd65e580df6d70784a9833ef76e0fb0455966100415fcd37648cc42463.jpg"
                  alt="Premium tech gadgets by Design_Nation on Pixabay"
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute top-12 right-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#7DF9FF]" />
                    <div>
                      <div className="text-xs text-white/70">Trending</div>
                      <div className="text-lg font-bold text-white">+45%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose TechStore?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with premium products and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0070FF] to-[#7DF9FF] flex items-center justify-center shadow-lg shadow-[#0070FF]/30 group-hover:shadow-[#0070FF]/50 transition-all">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Products
              </h2>
              <p className="text-white/60">
                Handpicked selection of our most popular items
              </p>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product.id, product.price)}
                        className="bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] text-white border-0 hover:shadow-lg hover:shadow-[#0070FF]/30 cursor-pointer active:scale-95 transition-transform"
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0070FF]/20 to-[#7DF9FF]/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-[#7DF9FF]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who trust TechStore for their technology needs.
              Get exclusive deals and early access to new products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checkout">
                <Button className="bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] text-white border-0 hover:shadow-lg hover:shadow-[#0070FF]/30 transition-all px-8 py-6 text-base">
                  Start Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;