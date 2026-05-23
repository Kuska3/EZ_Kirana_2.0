import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingCart, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, addToast } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product); // Remove from wishlist on transfer
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            My Wishlist
          </h2>
          <p className="text-xs text-slate-450 font-bold mt-1">Saved items you're planning to buy</p>
        </div>
        {wishlist.length > 0 && (
          <span className="text-xs font-black text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3.5 py-1.5 rounded-full shadow-sm">
            {wishlist.length} Items Saved
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] shadow-premium"
          >
            {/* Heart Pulsing Animation */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-rose-50 dark:bg-rose-950/30 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 fill-rose-400 text-rose-400" />
              </motion.div>
              <div className="absolute -top-1.5 -right-1.5 text-lg">✨</div>
            </div>

            <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-450 font-bold mt-2 leading-relaxed">
              Explore our fresh organic veggies, daily dairy essentials, snacks, and save your favorites here for quick purchasing later!
            </p>
            
            <button
              onClick={() => navigate('/products')}
              className="mt-6 w-full py-3.5 bg-gradient-to-tr from-green-500 to-emerald-400 hover:shadow-lg hover:shadow-green-500/15 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Start Exploring Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {wishlist.map((product) => {
              const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              
              return (
                <motion.div
                  key={product.id}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-5 shadow-premium flex gap-4 relative justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    {/* Image */}
                    <Link to={`/product/${product.id}`} className="w-20 h-20 bg-slate-50 dark:bg-slate-850 p-2 rounded-2xl shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                      />
                    </Link>

                    {/* Meta details */}
                    <div className="text-left">
                      <span className="text-[9px] font-black text-primary-500 uppercase tracking-widest block mb-0.5">
                        {product.category}
                      </span>
                      <Link to={`/product/${product.id}`} className="hover:text-primary-500">
                        <h4 className="font-extrabold text-slate-800 dark:text-slate-150 text-sm line-clamp-1">
                          {product.name}
                        </h4>
                      </Link>
                      <span className="text-xs text-slate-400 font-bold block mt-0.5">{product.unit}</span>
                      
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm font-black text-slate-800 dark:text-white">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-[11px] text-slate-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMoveToCart(product)}
                      className="p-3 bg-gradient-to-tr from-green-500 to-emerald-400 hover:shadow-md text-white rounded-xl flex items-center justify-center cursor-pointer"
                      title="Move to Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist(product)}
                      className="p-3 bg-slate-50 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-500 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800/80 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
