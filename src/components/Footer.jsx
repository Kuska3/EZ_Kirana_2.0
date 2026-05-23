import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Send, ArrowRight, ShieldCheck, Truck, RefreshCw, Smartphone } from 'lucide-react';

export const Footer = () => {
  const { addToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast(`Subscribed successfully with ${email}! Welcome aboard.`, 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 dark:border-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Value Props Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm">Superfast Delivery</h4>
              <p className="text-xs text-slate-500 mt-0.5">Fresh groceries delivered at your door in 10-20 minutes.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm">Best Prices & Offers</h4>
              <p className="text-xs text-slate-500 mt-0.5">Cheaper than local supermarkets with daily deals.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm">Easy Returns & Refunds</h4>
              <p className="text-xs text-slate-500 mt-0.5">No questions asked return policy inside the app.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Newsletter & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-1.5 group w-max">
              <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl font-extrabold text-white">
                Ez <span className="text-primary-500">Kirana</span>
              </h2>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Ez Kirana 2.0 is India's premium quick-commerce grocery app. We deliver ultra-fresh organic produce, dairy, bakery products, and instant essentials in under 15 minutes.
            </p>
            
            {/* Download app buttons */}
            <div className="flex gap-3 mt-2">
              <a href="#playstore" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white rounded-xl px-4 py-2 transition-colors">
                <Smartphone className="w-4.5 h-4.5 text-emerald-400" />
                <div className="text-left leading-none">
                  <span className="text-[9px] text-slate-500 font-semibold block">GET IT ON</span>
                  <span className="text-xs font-black">Google Play</span>
                </div>
              </a>
              <a href="#appstore" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white rounded-xl px-4 py-2 transition-colors">
                <Smartphone className="w-4.5 h-4.5 text-emerald-400" />
                <div className="text-left leading-none">
                  <span className="text-[9px] text-slate-500 font-semibold block">Download on</span>
                  <span className="text-xs font-black">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Useful Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3.5">
              <h3 className="text-white font-extrabold text-xs tracking-widest uppercase">Useful Links</h3>
              <ul className="flex flex-col gap-2.5 text-sm font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Shop Groceries</Link></li>
                <li><Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">User Profile</Link></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3.5">
              <h3 className="text-white font-extrabold text-xs tracking-widest uppercase">Company</h3>
              <ul className="flex flex-col gap-2.5 text-sm font-medium">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Input */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-white font-extrabold text-xs tracking-widest uppercase">Newsletter</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Subscribe to get exclusive discount codes and weekly fresh-stock updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center w-full mt-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-slate-500 border border-slate-700/80 focus:border-primary-500 outline-none rounded-xl py-3 pl-4 pr-12 text-sm transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 p-2 bg-gradient-to-tr from-green-500 to-emerald-400 text-white rounded-lg hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-850 pt-8 mt-8 text-xs text-slate-600 font-medium">
          <p>© 2026 Ez Kirana Corporation. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#fb" className="hover:text-slate-400 transition-colors">Facebook</a>
            <a href="#tw" className="hover:text-slate-400 transition-colors">Twitter</a>
            <a href="#ig" className="hover:text-slate-400 transition-colors">Instagram</a>
            <a href="#in" className="hover:text-slate-400 transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
