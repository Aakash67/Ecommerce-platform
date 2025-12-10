import { Target, Users, Zap, Award, Heart, Globe, TrendingUp, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '1000+', label: 'Products', icon: Zap },
    { value: '99.9%', label: 'Satisfaction Rate', icon: Award },
    { value: '50+', label: 'Countries', icon: Globe }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We constantly seek out the latest technology and innovations to bring you cutting-edge products that enhance your digital lifestyle.'
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We provide exceptional service and support to ensure you have the best shopping experience.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product undergoes rigorous testing and quality checks to meet our high standards before reaching you.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'We are committed to growing with our customers, constantly improving our services and expanding our product range.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://i.pravatar.cc/300?u=sarah',
      bio: 'Tech visionary with 15+ years in e-commerce'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://i.pravatar.cc/300?u=michael',
      bio: 'Innovation leader and technology expert'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://i.pravatar.cc/300?u=emily',
      bio: 'Product strategist with passion for UX'
    },
    {
      name: 'David Kim',
      role: 'Head of Operations',
      image: 'https://i.pravatar.cc/300?u=david',
      bio: 'Operations expert ensuring smooth delivery'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0070FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7DF9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#1560BD] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              About TechStore
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
            We're on a mission to make cutting-edge technology accessible to everyone. 
            Since 2020, we've been helping customers discover and purchase the latest tech innovations.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#0070FF] to-[#7DF9FF] flex items-center justify-center shadow-lg shadow-[#0070FF]/30">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0070FF] to-[#7DF9FF] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-white/60">
                <p>
                  TechStore was founded in 2020 with a simple vision: to create a trusted destination 
                  where technology enthusiasts and everyday users alike could discover and purchase 
                  the latest innovations in consumer electronics.
                </p>
                <p>
                  What started as a small online store has grown into a thriving community of over 
                  50,000 satisfied customers across 50+ countries. Our success is built on three 
                  core principles: quality products, exceptional service, and competitive pricing.
                </p>
                <p>
                  Today, we partner with leading technology brands to bring you an ever-expanding 
                  catalog of premium products, from audio equipment and gaming gear to smart home 
                  devices and professional accessories.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-8">
                <img
                  src="https://pixabay.com/get/g45afa8fd88a8008f065eeb1b1543a4c44ffe17ed9d0efe74da1ce81d931b40c0b6d6ce8b831d8a0d0d81b1c407cdaf22.jpg"
                  alt="TechStore office by Vilkasss on Pixabay"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0070FF] to-[#7DF9FF] flex items-center justify-center shadow-lg shadow-[#0070FF]/30">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="text-sm text-white/60">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The passionate people behind TechStore
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-[#0070FF]/20 group-hover:ring-[#0070FF]/40 transition-all">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-[#7DF9FF] mb-2">{member.role}</p>
                  <p className="text-xs text-white/60">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;