import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Sun, Moon, Sparkles, X, ChevronRight, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const { cartItems, cartSubtotal, productsList } = useCart();
  const { wishlist } = useWishlist();
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync suggestion filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = productsList
        .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, productsList]);

  // Close suggestions and mobile menu on route change
  useEffect(() => {
    setShowSuggestions(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full glassmorphism dark:glassmorphism shadow-premium border-b border-white/20 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-green-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5.5 h-5.5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none text-slate-800 dark:text-white">
              Ez <span className="text-primary-500">Kirana</span>
            </h1>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest leading-none mt-0.5 flex items-center gap-0.5">
              2.0 <Sparkles className="w-2.5 h-2.5 fill-current" />
            </span>
          </div>
        </Link>

        {/* Real-time Autocomplete Search Bar */}
        <form 
          ref={searchRef}
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative flex-grow max-w-xl"
        >
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search chocolate, banana, paneer, milk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
              className="w-full bg-slate-100/80 hover:bg-slate-200/50 focus:bg-white border border-slate-100 focus:border-primary-500 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:focus:bg-slate-900 dark:border-slate-800 focus:outline-none rounded-2xl pl-12 pr-10 py-2.5 sm:py-3 text-sm font-medium transition-all shadow-inner dark:text-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-50 py-2"
              >
                <div className="px-4 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Product Suggestions
                </div>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSuggestionClick(product.id)}
                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 rounded-lg bg-slate-50 p-0.5 object-cover"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-slate-400 font-semibold text-xs">
                      <span className="text-slate-700 dark:text-slate-200 font-bold">₹{product.price}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Light/Dark Toggle */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={toggleDarkMode}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors shadow-sm cursor-pointer"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Wishlist Link */}
          <Link to="/wishlist" className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors shadow-sm hidden sm:block">
            <Heart className="w-5 h-5" />
            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-rose-500/20"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Seller Portal */}
          <Link to="/vendor" className="px-3 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-primary-500 transition-colors shadow-sm hidden lg:flex items-center gap-1">
            <span className="text-xs font-black text-emerald-500 dark:text-emerald-400">🏪 Seller Hub</span>
          </Link>

          {/* User Profile */}
          <Link to="/profile" className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors shadow-sm">
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Widget Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2.5 sm:py-3 rounded-2xl font-extrabold text-sm shadow-lg shadow-green-500/25 hover:shadow-green-500/35 transition-all active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalCartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: [0, -4, 0] }}
                    className="absolute -top-2.5 -right-2 bg-amber-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="hidden sm:block">
              {totalCartCount > 0 ? `₹${cartSubtotal}` : 'Cart'}
            </span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </div>

      {/* Mobile Sticky Search bar */}
      <div className="md:hidden border-t border-slate-100 dark:border-slate-900 bg-white/75 dark:bg-slate-950/75 px-4 py-2 flex items-center">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <input
            type="text"
            placeholder="Search grocery products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900 rounded-xl pl-10 pr-8 py-2 text-xs focus:outline-none dark:text-white"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </form>
      </div>

      {/* Mobile Slider Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-slate-900 shadow-2xl z-50 p-6 flex flex-col gap-6 md:hidden border-l border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-lg text-slate-800 dark:text-white">Navigation</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4 text-sm font-bold text-slate-600 dark:text-slate-300">
              <Link to="/" className="py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-500">
                Home
              </Link>
              <Link to="/products" className="py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-500">
                All Products
              </Link>
              <Link to="/wishlist" className="py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-500 flex justify-between items-center">
                Wishlist
                {wishlist.length > 0 && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{wishlist.length}</span>}
              </Link>
              <Link to="/profile" className="py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-500">
                My Profile
              </Link>
              <Link to="/vendor" className="py-2 px-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors">
                🏪 Seller Hub
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
