import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Flame, Zap, Award, Star } from 'lucide-react';
import { categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const navigate = useNavigate();
  const { productsList } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Super Fresh Fruits & Organic Veggies",
      subtitle: "Straight from certified local organic farms to your kitchen in under 15 minutes.",
      badge: "UP TO 40% OFF",
      bgGradient: "from-green-600/90 to-emerald-800/90",
      cta: "Shop Fresh Produce",
      categoryId: "fruits-veggies"
    },
    {
      title: "Daily Bakery & Dairy Essentials",
      subtitle: "Wake up to fresh milk, creamy butter, whole-grain breads, and warm breakfast pastries.",
      badge: "FRESH & DELIVERED DAILY",
      bgGradient: "from-amber-500/90 to-orange-700/95",
      cta: "Explore Dairy & Bread",
      categoryId: "dairy-eggs"
    },
    {
      title: "Midnight Munchies & Snack Vault",
      subtitle: "Craving chips, sodas, chocolates, or instant noodles? We got you sorted 24/7.",
      badge: "FLAT 20% OFF",
      bgGradient: "from-purple-600/90 to-indigo-850/90",
      cta: "Explore Snacks",
      categoryId: "snacks-munchies"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);

  const trendingProducts = productsList.filter(p => p.isTrending && p.inStock).slice(0, 4);
  const dailyEssentials = productsList.filter(p => p.isDailyEssential && p.inStock).slice(0, 4);
  const featuredDeals = productsList.filter(p => p.isFeaturedDeal && p.inStock).slice(0, 4);

  const reviews = [
    {
      id: 1,
      name: "Aishwarya Sharma",
      role: "Software Developer",
      quote: "Ez Kirana 2.0 has completely replaced my weekly grocery runs. The vegetables arrive pre-washed, fresh, and literally in 10 minutes!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 2,
      name: "Rohit Malhotra",
      role: "UI/UX Designer",
      quote: "The interface is slick, the glassmorphism elements look extremely premium, and the cart transition is so satisfying. Absolute masterpiece!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 3,
      name: "Nikhil Joshi",
      role: "Product Manager",
      quote: "Incredible speed, outstanding pricing, and great discounts. Applying coupons and completing checkout takes literally 3 clicks. Highly recommended!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16"
    >
      
      {/* 1. Hero Banner Slider Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        <div className="relative h-[280px] sm:h-[400px] rounded-[32px] overflow-hidden shadow-xl shadow-green-500/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-tr ${heroSlides[currentSlide].bgGradient} flex flex-col justify-center px-8 sm:px-16 text-white`}
            >
              {/* Decorative Glow Blob */}
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-xl z-10 flex flex-col gap-2 sm:gap-4 items-start">
                <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
                  {heroSlides[currentSlide].badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight sm:leading-none">
                  {heroSlides[currentSlide].title}
                </h2>
                <p className="text-xs sm:text-base text-white/80 leading-relaxed font-medium">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(`/products?category=${heroSlides[currentSlide].categoryId}`)}
                  className="bg-white text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center gap-2 hover:shadow-lg transition-all duration-300 mt-2 sm:mt-4 cursor-pointer"
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/25 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/45 transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/25 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/45 transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slides Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Categories Circular Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              🥦 Browse by Category
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Select from our wide selection of fresh items</p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs sm:text-sm font-extrabold text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.map((category) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category.id}
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-premium hover:shadow-premium-hover hover:border-primary-100 transition-all duration-300 cursor-pointer"
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow-md mb-2">{category.icon}</span>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 text-center leading-tight">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. Featured Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 fill-amber-400 text-amber-400 stroke-[2.5]" />
              Super Saver Featured Deals
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Unmissable discounts on premium staples</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Daily Essentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500 stroke-[2.5]" />
              Your Daily Essentials
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Staples that keep your home healthy and functioning</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dailyEssentials.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 fill-rose-500 text-rose-500 stroke-[2.5]" />
              What's Trending Now
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">Popular quick-buys flies off shelves fast</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-10 border-t border-slate-100 dark:border-slate-900">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase block mb-1">
            TESTIMONIALS
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
            What Our Customers Say
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-2">
            Over 50,000+ happy homes served across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[28px] shadow-premium hover:shadow-premium-hover flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-350 italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/80">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover shadow-inner"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold tracking-wide">
                    {rev.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
};
