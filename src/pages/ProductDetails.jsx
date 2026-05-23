import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plus, Minus, Star, Shield, ArrowLeft, RotateCcw, Clock, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { SkeletonProductDetails } from '../components/Skeleton';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, productsList } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  // Simulate server fetching and filter matching
  useEffect(() => {
    setLoading(true);
    const foundProduct = productsList.find(p => p.id === id);
    
    const timer = setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 450);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SkeletonProductDetails />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-6xl block mb-4">🤷‍♂️</span>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400 mt-1">The grocery item you're looking for doesn't exist or is currently unlisted.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl text-xs font-extrabold shadow-lg"
        >
          Go back to Shop
        </button>
      </div>
    );
  }

  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isFavorite = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Fetch related items (excluding current product, limit to 4)
  const relatedProducts = productsList
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.inStock)
    .slice(0, 4);

  // Magnify Hover Effect handlers
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.pageXOffset) / width) * 100;
    const y = ((e.pageY - top - window.pageYOffset) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${product.image})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Back Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-xs font-bold text-slate-450 hover:text-slate-800 dark:hover:text-white transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Results
      </button>

      {/* Main product box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[36px] p-6 sm:p-8 lg:p-12 shadow-premium mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left: Image Viewer & Zoom */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-850/40 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center p-6">
              
              {/* Image Frame */}
              <img
                src={product.image}
                alt={product.name}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="max-w-full max-h-full object-contain cursor-zoom-in mix-blend-multiply dark:mix-blend-normal"
              />

              {/* Magnified Frame */}
              <div 
                className="absolute inset-0 pointer-events-none hidden lg:block border border-slate-200 dark:border-slate-700 bg-no-repeat rounded-3xl"
                style={zoomStyle}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {discountPercent > 0 && product.inStock && (
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {discountPercent}% OFF
                  </span>
                )}
                {product.isTrending && product.inStock && (
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm tracking-wider uppercase">
                    🔥 POPULAR BUY
                  </span>
                )}
              </div>

              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 p-3 rounded-full glassmorphism dark:glassmorphism shadow-sm text-slate-400 hover:text-rose-500 transition-all active:scale-80"
              >
                <Heart
                  className={`w-4.5 h-4.5 ${isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''}`}
                />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider mt-3 uppercase hidden lg:block">
              Hover over image to zoom
            </p>
          </div>

          {/* Right: Product Detail Metadata */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Category Breadcrumb */}
            <span className="text-xs font-black tracking-widest text-primary-500 uppercase mb-2">
              {product.category}
            </span>

            {/* Title & Units */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3.5 mt-3">
              <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">{product.rating}</span>
              </div>
              <span className="text-xs font-bold text-slate-400">{product.reviews} Customer Reviews</span>
              <span className="text-xs font-extrabold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-lg">
                {product.unit}
              </span>
            </div>

            <hr className="my-6 border-slate-100 dark:border-slate-800/80" />

            {/* Price section */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-800 dark:text-white">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base text-slate-400 line-through">₹{product.originalPrice}</span>
                  <span className="text-sm font-bold text-emerald-500">
                    Save ₹{product.originalPrice - product.price}!
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-rose-500'}`} />
              <span className="text-xs font-bold text-slate-650 dark:text-slate-350">
                {product.inStock ? 'In Stock (Delivering in 15 Mins)' : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <div className="mt-6 flex flex-col gap-2">
              <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 tracking-wider uppercase">Product Details</h4>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Value prop icons */}
            <div className="grid grid-cols-3 gap-4 my-6 py-4 border-y border-slate-50 dark:border-slate-800/80 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-350">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Shield className="w-5 h-5 text-primary-500" />
                <span>100% Quality Assurance</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-primary-500" />
                <span>Hassle-Free Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Clock className="w-5 h-5 text-primary-500" />
                <span>Instant 15-Min Delivery</span>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex gap-4">
              {!product.inStock ? (
                <button
                  disabled
                  className="flex-grow py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-2xl text-sm font-extrabold cursor-not-allowed"
                >
                  Sold Out
                </button>
              ) : quantity > 0 ? (
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-1.5 rounded-2xl">
                  <div className="flex items-center gap-4 px-2">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 bg-white dark:bg-slate-700 hover:bg-primary-50 rounded-xl text-primary-650 transition-colors shadow-sm cursor-pointer"
                    >
                      <Minus className="w-4 h-4 stroke-[3]" />
                    </motion.button>
                    <span className="text-sm font-black text-slate-800 dark:text-white">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 bg-white dark:bg-slate-700 hover:bg-primary-50 rounded-xl text-primary-650 transition-colors shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </motion.button>
                  </div>
                  <span className="text-xs font-bold text-slate-450 px-2 pr-4 border-l border-slate-200 dark:border-slate-700">Added to Cart</span>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/15 text-white font-extrabold text-sm py-3.5 rounded-2xl transition-all cursor-pointer shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white text-left mb-6">
            ✨ You Might Also Like
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </motion.div>
  );
};
