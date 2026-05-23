import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Auth = () => {
  const navigate = useNavigate();
  const { addToast } = useCart();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email.trim() && password.trim()) {
        addToast("Logged in successfully! Welcome back.", "success");
        navigate('/');
      } else {
        addToast("Please fill in all fields.", "error");
      }
    } else {
      if (name.trim() && email.trim() && password.trim()) {
        addToast("Account created successfully! Welcome to Ez Kirana.", "success");
        navigate('/');
      } else {
        addToast("Please fill in all fields.", "error");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] max-w-7xl mx-auto px-4 flex items-center justify-center py-12"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main glass card */}
      <motion.div
        initial={{ y: 25, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 backdrop-blur-xl shadow-premium rounded-[36px] p-8 sm:p-10 relative overflow-hidden"
      >
        {/* Brand Banner */}
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-450 flex items-center justify-center text-white shadow-md shadow-green-500/15">
            <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mt-2">
            {isLogin ? 'Welcome Back!' : 'Join Ez Kirana'}
          </h2>
          <p className="text-xs text-slate-450 font-bold max-w-xs">
            {isLogin ? 'Login to order fresh organic produce and dairy essentials instantly!' : 'Create an account to start shopping our ultra-fresh catalog!'}
          </p>
        </div>

        {/* Tab switch header */}
        <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-1 mb-6 border border-slate-50 dark:border-slate-850">
          <button
            onClick={() => { setIsLogin(true); setName(''); }}
            className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${isLogin ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm' : 'text-slate-450 hover:text-slate-700 dark:hover:text-white'}`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setIsLogin(false); }}
            className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${!isLogin ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm' : 'text-slate-450 hover:text-slate-700 dark:hover:text-white'}`}
          >
            REGISTER
          </button>
        </div>

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-1.5"
              >
                <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl py-3 pl-10 pr-4 text-xs font-bold focus:outline-none dark:text-white"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl py-3 pl-10 pr-4 text-xs font-bold focus:outline-none dark:text-white"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Password</label>
              {isLogin && (
                <a href="#forgot" className="text-[10px] font-black text-primary-500 hover:text-primary-600">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl py-3 pl-10 pr-10 text-xs font-bold focus:outline-none dark:text-white"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-650"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 tracking-wide cursor-pointer transition-all active:scale-[0.98]"
          >
            {isLogin ? 'Sign In to Account' : 'Register New Account'}
            <Sparkles className="w-4 h-4 fill-current text-white" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-6 text-[9px] text-slate-400 font-bold tracking-wide border-t border-slate-50 dark:border-slate-850 pt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secure AES encryption active</span>
        </div>

      </motion.div>
    </motion.div>
  );
};
