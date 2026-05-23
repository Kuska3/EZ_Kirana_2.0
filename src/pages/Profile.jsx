import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Package, Award, Sparkles, TrendingUp, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Profile = () => {
  const { addToast } = useCart();
  const navigate = useNavigate();

  const userDetails = {
    name: "Kushagra Sharma",
    email: "kushagrasharma@gmail.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    joined: "Member since May 2024"
  };

  const statCards = [
    { label: "Total Orders Placed", value: "24", icon: <Package className="w-5 h-5 text-blue-500" />, color: "bg-blue-500/10" },
    { label: "Lifetime Shopping Spent", value: "₹6,840", icon: <TrendingUp className="w-5 h-5 text-emerald-500" />, color: "bg-emerald-500/10" },
    { label: "Total Wallet Savings", value: "₹1,240", icon: <Award className="w-5 h-5 text-amber-500" />, color: "bg-amber-500/10" }
  ];

  const savedAddresses = [
    { id: 1, type: "Home", name: "Aarav Mehta", address: "Flat 402, Block C, Green Meadows Apartments, HSR Layout Sector 2, Bengaluru, Karnataka - 560102", tag: "DEFAULT" },
    { id: 2, type: "Office", name: "Aarav Mehta", address: "5th Floor, Block B, Tech Hub Towers, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103", tag: "WORK" }
  ];

  const pastOrders = [
    {
      id: "EZK-9843",
      date: "May 18, 2026",
      items: "Organic Cavendish Bananas x 1, Pasteurised Salted Butter x 2, Surf Excel Detergent x 1",
      total: 353,
      status: "Delivered",
      statusColor: "text-emerald-500 bg-emerald-500/10"
    },
    {
      id: "EZK-7649",
      date: "May 04, 2026",
      items: "Fresh Hybrid Tomatoes x 1, Classic Salted Potato Chips x 3, Coca-Cola Zero Sugar x 2",
      total: 165,
      status: "Delivered",
      statusColor: "text-emerald-500 bg-emerald-500/10"
    },
    {
      id: "EZK-4321",
      date: "April 22, 2026",
      items: "Colgate MaxFresh Gel x 1, Premium Royal Gala Apples x 2, Mother Dairy Paneer x 1",
      total: 491,
      status: "Delivered",
      statusColor: "text-emerald-500 bg-emerald-500/10"
    }
  ];

  const handleLogout = () => {
    addToast("Logged out successfully.", "info");
    navigate('/auth');
  };

  const handleReorder = (orderId) => {
    addToast(`Items from Order ${orderId} copied back to cart!`, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Quick Actions and Details */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-premium text-center">
            
            {/* User details */}
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary-500 shadow-md">
              <img src={userDetails.avatar} alt={userDetails.name} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="font-extrabold text-slate-800 dark:text-white text-lg flex items-center justify-center gap-1.5">
              {userDetails.name}
              <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            </h3>
            <p className="text-xs font-bold text-slate-400 mt-0.5">{userDetails.email}</p>
            <p className="text-xs font-extrabold text-slate-500 dark:text-slate-350 mt-1">{userDetails.phone}</p>
            
            <span className="inline-block mt-4 text-[10px] text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3.5 py-1.5 rounded-full font-black tracking-wider uppercase">
              {userDetails.joined}
            </span>

            {/* Menu options */}
            <div className="flex flex-col gap-2.5 mt-8 border-t border-slate-50 dark:border-slate-850 pt-6 text-left">
              <button className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl text-xs font-bold text-slate-655 dark:text-slate-300 transition-colors w-full cursor-pointer">
                <span className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-slate-400" />
                  Edit Profile
                </span>
                <ChevronRight className="w-4 h-4 text-slate-455" />
              </button>
              <button 
                onClick={() => navigate('/vendor')}
                className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl text-xs font-bold text-slate-655 dark:text-slate-300 transition-colors w-full cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-slate-400">🏪</span>
                  Vendor / Seller Portal
                </span>
                <ChevronRight className="w-4 h-4 text-slate-455" />
              </button>
              <button className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl text-xs font-bold text-slate-655 dark:text-slate-300 transition-colors w-full cursor-pointer">
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Help & Customer Support
                </span>
                <ChevronRight className="w-4 h-4 text-slate-455" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-between p-3 hover:bg-rose-50 dark:hover:bg-rose-950/10 rounded-2xl text-xs font-bold text-rose-500 transition-colors w-full cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4" />
                  Logout Account
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right column: Stats and Order ledger */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          
          {/* Stat metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statCards.map((card, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={card.label}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-premium flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shrink-0`}>
                  {card.icon}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block">{card.label}</span>
                  <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block leading-none">{card.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Past Orders ledger */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-premium">
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary-500" />
              Past Orders History
            </h3>
            
            <div className="flex flex-col gap-5">
              {pastOrders.map((order) => (
                <div key={order.id} className="border border-slate-50 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-slate-50/50 dark:bg-slate-850/20">
                  <div className="max-w-md">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-800 dark:text-white">{order.id}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{order.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-2 line-clamp-2 leading-relaxed">
                      {order.items}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col text-left md:text-right shrink-0">
                      <span className="text-sm font-black text-slate-800 dark:text-white">₹{order.total}</span>
                      <span className={`text-[9px] font-black tracking-wide uppercase px-2 py-0.5 rounded-md mt-1 ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleReorder(order.id)}
                      className="px-4 py-2 border border-primary-500 text-primary-650 hover:bg-primary-500 hover:text-white dark:text-primary-400 dark:hover:text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Addresses list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-premium">
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-500" />
              Saved Delivery Addresses
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="border border-slate-50 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between text-left relative bg-slate-50/50 dark:bg-slate-850/20">
                  <span className="absolute top-4 right-4 text-[9px] font-black text-primary-600 bg-primary-50 dark:bg-primary-950/20 px-2.5 py-1 rounded-md tracking-wider uppercase">
                    {addr.tag}
                  </span>
                  <div>
                    <h4 className="font-black text-slate-850 dark:text-white text-sm">{addr.type}</h4>
                    <p className="text-xs text-slate-450 font-black mt-1">{addr.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                      {addr.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
};
