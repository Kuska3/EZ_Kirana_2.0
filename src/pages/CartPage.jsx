import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBasket, Trash2, Plus, Minus, Tag, Check, X, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const {
    cartItems,
    coupon,
    availableCoupons,
    cartSubtotal,
    savingsTotal,
    gst,
    deliveryFee,
    couponDiscount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    addToast
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyCoupon(couponInput.trim().toUpperCase());
      if (success) setCouponInput('');
    }
  };

  const handleDirectCouponClick = (code) => {
    applyCoupon(code);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-2.5">
        <ShoppingBasket className="w-7 h-7 text-primary-500" />
        Shopping Cart ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} Items)
      </h2>

      <AnimatePresence mode="wait">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] shadow-premium"
          >
            <div className="w-24 h-24 bg-primary-50 dark:bg-primary-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBasket className="w-10 h-10 text-primary-500" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Your Cart is Empty</h3>
            <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Let's fill it with fresh organic produce and dairy essentials!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-6 w-full py-3.5 bg-gradient-to-tr from-green-500 to-emerald-400 hover:shadow-lg hover:shadow-green-500/15 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. Left side: Items list */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-premium">
                <div className="flex flex-col gap-5">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        exit={{ opacity: 0, x: -50 }}
                        className="flex items-center justify-between gap-4 pb-5 border-b border-slate-50 dark:border-slate-800/60 last:pb-0 last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <Link to={`/product/${item.id}`} className="w-16 h-16 bg-slate-50 dark:bg-slate-850 p-1.5 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                            />
                          </Link>
                          
                          <div className="text-left">
                            <Link to={`/product/${item.id}`} className="hover:text-primary-500 transition-colors">
                              <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">
                                {item.name}
                              </h4>
                            </Link>
                            <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">{item.unit}</span>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-sm font-black text-slate-800 dark:text-white">₹{item.price}</span>
                              {item.originalPrice > item.price && (
                                <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Adjusters and trash */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 rounded-xl px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-750 text-slate-500 rounded-lg transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <span className="text-xs font-black px-3 select-none text-slate-800 dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-750 text-slate-500 rounded-lg transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Promo section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-premium text-left">
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm mb-3 flex items-center gap-1.5">
                  <Ticket className="w-4.5 h-4.5 text-primary-500" />
                  Apply Discount Coupon
                </h4>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. KIRANA100)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-500 uppercase font-bold text-slate-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-750 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Available coupons list */}
                <div className="mt-4 flex flex-col gap-2.5">
                  <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase block">Available Promotions</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {availableCoupons.map((c) => {
                      const isCurrentlyApplied = coupon && coupon.code === c.code;
                      const isDisabled = cartSubtotal < c.minOrder;
                      
                      return (
                        <button
                          key={c.code}
                          disabled={isDisabled}
                          onClick={() => handleDirectCouponClick(c.code)}
                          className={`border rounded-2xl p-3 flex flex-col text-left transition-all relative ${isCurrentlyApplied ? 'border-primary-500 bg-primary-500/5' : (isDisabled ? 'opacity-50 border-slate-100 dark:border-slate-800/50 cursor-not-allowed' : 'border-slate-100 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 cursor-pointer')}`}
                        >
                          {isCurrentlyApplied && (
                            <span className="absolute top-3 right-3 w-4 h-4 bg-primary-500 text-white rounded-full flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                          <span className={`text-xs font-black ${isCurrentlyApplied ? 'text-primary-600' : 'text-slate-800 dark:text-white'}`}>{c.code}</span>
                          <span className="text-[9px] text-slate-450 font-bold mt-1 line-clamp-2">{c.description}</span>
                          {isDisabled && (
                            <span className="text-[8px] font-bold text-rose-500 mt-1">Add ₹{c.minOrder - cartSubtotal} more</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Right side: Bill break-down */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 shadow-premium text-left">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-4">Payment Summary</h3>

                {/* Applied promotion pill banner */}
                {coupon && (
                  <div className="bg-primary-50 border border-primary-500/10 rounded-2xl px-4 py-2.5 mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary-750">
                      <Tag className="w-4 h-4 fill-primary-500 text-primary-500" />
                      <div>
                        <p className="text-[10px] font-black tracking-widest uppercase">PROMO APPLIED</p>
                        <p className="text-xs font-black">{coupon.code}</p>
                      </div>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="p-1 hover:bg-primary-100 text-primary-500 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Ledger Lines */}
                <div className="flex flex-col gap-3 font-bold text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="text-slate-850 dark:text-white font-extrabold">₹{cartSubtotal}</span>
                  </div>
                  
                  {savingsTotal > 0 && (
                    <div className="flex justify-between text-emerald-500 font-extrabold">
                      <span>Store Product Savings</span>
                      <span>-₹{savingsTotal}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-500 font-extrabold">
                      <span>Promo Coupon Discount</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>GST (5% Grocery Tax)</span>
                    <span className="text-slate-850 dark:text-white font-extrabold">₹{gst}</span>
                  </div>

                  <div className="flex justify-between pb-3.5 border-b border-slate-50 dark:border-slate-800">
                    <span>Delivery Charges</span>
                    <span className={`font-black ${deliveryFee === 0 ? 'text-emerald-500' : 'text-slate-850 dark:text-white'}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1 text-slate-800 dark:text-white">
                    <span className="text-sm font-black">To Pay</span>
                    <span className="text-2xl font-black text-primary-500">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Floating savings alert */}
                {savingsTotal + couponDiscount > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-black py-2.5 px-4 rounded-xl text-center mt-6">
                    🎉 You are saving ₹{savingsTotal + couponDiscount} on this order!
                  </div>
                )}

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/25 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 tracking-wide cursor-pointer transition-all active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 font-bold tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Safe and Secure Checkout</span>
                </div>

              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
