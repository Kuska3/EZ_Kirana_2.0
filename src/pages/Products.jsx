import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, X, Star, Sparkles, Filter, Grid } from 'lucide-react';
import { categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { SkeletonProductCard } from '../components/Skeleton';

export const Products = () => {
  const { productsList } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // States from Search Params
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam !== 'all' ? [categoryParam] : []
  );
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync Category from search queries
  useEffect(() => {
    if (categoryParam !== 'all') {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryParam]);

  // Simulate loading delay whenever filters/search changes to show off skeletons
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedCategories, maxPrice, minRating, sortBy, hideOutOfStock, searchParam]);

  // Filter and Sort Logic
  const filteredProducts = productsList.filter(product => {
    // 1. Search Query Match
    if (searchParam && !product.name.toLowerCase().includes(searchParam.toLowerCase()) && !product.category.toLowerCase().includes(searchParam.toLowerCase())) {
      return false;
    }
    // 2. Category Match
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) {
      return false;
    }
    // 3. Price Match
    if (product.price > maxPrice) {
      return false;
    }
    // 4. Rating Match
    if (product.rating < minRating) {
      return false;
    }
    // 5. Stock Match
    if (hideOutOfStock && !product.inStock) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') {
      const discountA = Math.round(((a.originalPrice - a.price) / a.originalPrice) * 100);
      const discountB = Math.round(((b.originalPrice - b.price) / b.originalPrice) * 100);
      return discountB - discountA;
    }
    return 0; // popular / default
  });

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      const active = prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId];
      
      // Update query param
      if (active.length === 1) {
        setSearchParams({ category: active[0] });
      } else {
        setSearchParams({});
      }
      return active;
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(300);
    setMinRating(0);
    setSortBy('popular');
    setHideOutOfStock(false);
    setSearchParams({});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      
      {/* Search Header Banner */}
      {searchParam && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-primary-500/10 rounded-3xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center text-white">
              <Filter className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-wider uppercase block">Search Results</span>
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">
                Showing results for "{searchParam}"
              </h2>
            </div>
          </div>
          <button 
            onClick={() => setSearchParams({})}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 1. Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sticky top-24 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5 text-primary-500" />
                Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Categories filter */}
            <div className="mb-6 pb-6 border-b border-slate-50 dark:border-slate-800/85">
              <h4 className="font-extrabold text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-3">Categories</h4>
              <div className="flex flex-col gap-2.5">
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2.5 text-sm font-bold text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(c.id)}
                      onChange={() => handleCategoryToggle(c.id)}
                      className="w-4 h-4 rounded text-primary-500 border-slate-300 dark:border-slate-700 focus:ring-primary-500 cursor-pointer"
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div className="mb-6 pb-6 border-b border-slate-50 dark:border-slate-800/85">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-extrabold text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase">Max Price</h4>
                <span className="text-xs font-extrabold text-primary-500 bg-primary-50 dark:bg-primary-950/35 px-2 py-0.5 rounded-md">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                <span>₹10</span>
                <span>₹300</span>
              </div>
            </div>

            {/* Customer Rating filter */}
            <div className="mb-6 pb-6 border-b border-slate-50 dark:border-slate-800/85">
              <h4 className="font-extrabold text-xs text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-3">Rating</h4>
              <div className="flex flex-col gap-2">
                {[4.5, 4.0, 3.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border text-left ${minRating === rating ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350'}`}
                  >
                    <Star className={`w-3.5 h-3.5 ${minRating === rating ? 'fill-current' : 'fill-amber-400 text-amber-400'}`} />
                    <span>{rating}★ & Above</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock filter */}
            <div>
              <label className="flex items-center gap-2.5 text-sm font-bold text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hideOutOfStock}
                  onChange={(e) => setHideOutOfStock(e.target.checked)}
                  className="w-4 h-4 rounded text-primary-500 border-slate-300 dark:border-slate-700 focus:ring-primary-500 cursor-pointer"
                />
                <span>Exclude Out of Stock</span>
              </label>
            </div>

          </div>
        </aside>

        {/* 2. Main Content */}
        <div className="flex-grow">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 px-6 py-4 rounded-3xl shadow-premium">
            <span className="text-xs sm:text-sm font-extrabold text-slate-500 dark:text-slate-400">
              Found <span className="text-slate-800 dark:text-white font-black">{filteredProducts.length}</span> Products
            </span>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex lg:hidden items-center gap-1.5 px-4 py-2 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-850 text-xs font-bold text-slate-650 hover:text-primary-500 dark:text-slate-350 dark:hover:text-primary-450 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary-500"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Savings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skeletons or Active Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-skeletons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              >
                {[...Array(6)].map((_, i) => (
                  <SkeletonProductCard key={i} />
                ))}
              </motion.div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                key="product-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-150 dark:border-slate-800 rounded-3xl"
              >
                <span className="text-5xl block mb-4">🔍</span>
                <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">No products found</h4>
                <p className="text-xs text-slate-400 font-semibold mt-1 max-w-xs mx-auto">
                  We couldn't find any products matching your filters. Try widening your price ranges or category selections.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 px-5 py-2.5 bg-gradient-to-tr from-green-500 to-emerald-400 text-white rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* 3. Mobile Filters Slide-up overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end lg:hidden">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-[32px] shadow-2xl p-6 overflow-y-auto flex flex-col gap-6 border-t border-slate-100 dark:border-slate-800 z-10 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                <h3 className="font-extrabold text-base text-slate-800 dark:text-white">Filter Controls</h3>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-650"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-extrabold text-xs text-slate-500 tracking-wider uppercase mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategoryToggle(c.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${selectedCategories.includes(c.id) ? 'bg-primary-500 border-primary-500 text-white' : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-extrabold text-xs text-slate-500 tracking-wider uppercase">Max Price</h4>
                  <span className="text-xs font-extrabold text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-2 py-0.5 rounded-md">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              {/* Ratings */}
              <div>
                <h4 className="font-extrabold text-xs text-slate-500 tracking-wider uppercase mb-3">Rating</h4>
                <div className="flex gap-2">
                  {[4.5, 4.0, 3.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${minRating === rating ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350'}`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rating}★+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 text-sm font-bold text-slate-650 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hideOutOfStock}
                    onChange={(e) => setHideOutOfStock(e.target.checked)}
                    className="w-4 h-4 rounded text-primary-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>Exclude Out of Stock</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-800 pt-6 mt-4">
                <button
                  onClick={clearFilters}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white rounded-2xl text-xs font-extrabold"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-green-500/10"
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
