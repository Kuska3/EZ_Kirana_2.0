import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isFavorite = isInWishlist(product.id);

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex flex-col justify-between shadow-premium hover:shadow-premium-hover transition-shadow duration-300 ${!product.inStock ? 'opacity-80' : ''}`}
    >
      {/* Badges and Heart */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {discountPercent > 0 && product.inStock && (
          <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {product.isTrending && product.inStock && (
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm tracking-wide uppercase">
            🔥 TRENDING
          </span>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full glassmorphism dark:glassmorphism shadow-sm text-slate-400 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-500 transition-colors"
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''}`}
        />
      </motion.button>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl mb-4 bg-slate-50 dark:bg-slate-800/50">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-contain p-2 mix-blend-multiply dark:mix-blend-normal"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <span className="text-[11px] font-semibold tracking-wider text-primary-600 dark:text-primary-400 uppercase mb-1">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="hover:text-primary-500 transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm line-clamp-2 min-h-[40px] leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating and Weight */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5 bg-slate-50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{product.rating}</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">{product.unit}</span>
        </div>
      </div>

      {/* Pricing and Cart Buttons */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/80">
        <div className="flex flex-col">
          <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Dynamic Quantity Buttons */}
        <div className="w-24">
          {!product.inStock ? (
            <span className="block text-center text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 py-2 rounded-xl">
              Out of Stock
            </span>
          ) : quantity > 0 ? (
            <div className="flex items-center justify-between border border-primary-500/20 bg-primary-50 dark:bg-primary-950/20 rounded-xl px-1.5 py-1 text-primary-600 dark:text-primary-400">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="p-1 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-lg transition-colors"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </motion.button>
              <span className="text-xs font-extrabold select-none">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="p-1 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center gap-1.5 border border-primary-500 text-primary-600 dark:text-primary-400 bg-white hover:bg-primary-500 hover:text-white dark:bg-slate-900 dark:hover:bg-primary-600 dark:hover:text-white transition-all duration-300 font-extrabold text-xs py-2 rounded-xl shadow-sm cursor-pointer"
            >
              ADD
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
