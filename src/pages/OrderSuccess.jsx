import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Calendar, Clock, ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  
  // Simulated tracking step state: 1 to 4
  const [trackingStep, setTrackingStep] = useState(1);
  const [minutesRemaining, setMinutesRemaining] = useState(15);

  useEffect(() => {
    // Read mock checkout order
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    } else {
      // Fallback dummy order
      setOrder({
        id: 'EZK-849310',
        address: 'Flat 402, Block C, Green Meadows Apartments, HSR Layout, Bengaluru, Karnataka - 560102',
        slot: '10-Min Superfast Delivery',
        total: 254,
        itemsCount: 4
      });
    }
  }, []);

  // Simulate rider tracking movement
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setTrackingStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 15000); // Progress every 15 seconds

    const countdownTimer = setInterval(() => {
      setMinutesRemaining(prev => (prev > 1 ? prev - 1 : 1));
    }, 60000); // Countdown every minute

    return () => {
      clearInterval(stepTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  if (!order) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-12 text-left"
    >
      {/* 1. Celebratory Success Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[36px] p-8 text-center shadow-premium mb-8 flex flex-col items-center">
        
        {/* Pulsing Success Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6"
        >
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </motion.div>

        <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase block mb-1">
          PAYMENT SUCCESSFUL
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
          Order Placed Successfully!
        </h2>
        <p className="text-xs text-slate-450 font-bold mt-2 max-w-sm">
          Thank you for choosing Ez Kirana 2.0. Your fresh organic produce is being packed at our nearest hub.
        </p>

        {/* Order brief cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8 border-t border-slate-50 dark:border-slate-800 pt-6">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl flex flex-col">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase">Order Number</span>
            <span className="text-sm font-black text-slate-800 dark:text-white mt-1">{order.id}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl flex flex-col">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase">Amount Paid</span>
            <span className="text-sm font-black text-primary-500 mt-1">₹{order.total}</span>
          </div>
        </div>

      </div>

      {/* 2. Interactive Live Delivery Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[36px] p-6 sm:p-8 shadow-premium mb-8">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50 dark:border-slate-800/80">
          <h3 className="font-extrabold text-slate-800 dark:text-white text-base">Live Order Tracking</h3>
          <span className="text-xs font-black text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-3 py-1 rounded-full animate-pulse">
            Arriving in {minutesRemaining} Mins
          </span>
        </div>

        {/* Tracking Timeline Stepper */}
        <div className="flex flex-col gap-8 relative mt-4 pl-8">
          
          {/* Timeline connecting vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
          <div 
            className="absolute left-3 top-2 w-0.5 bg-primary-500 transition-all duration-700" 
            style={{ height: trackingStep === 1 ? '0%' : trackingStep === 2 ? '33%' : trackingStep === 3 ? '66%' : '100%' }}
          />

          {[
            { step: 1, title: 'Order Confirmed', desc: 'We have received your payment and order details.' },
            { step: 2, title: 'Packing at Central Hub', desc: 'Our team is carefully handpicking fresh organic vegetables and packaging staples.' },
            { step: 3, title: 'Rider Out for Delivery', desc: 'Our fast-delivery partner is on the way to your exact location.' },
            { step: 4, title: 'Arrived at Doorstep', desc: 'Rider is near your gate! Please collect your packages.' }
          ].map((node) => {
            const isCompleted = trackingStep > node.step;
            const isActive = trackingStep === node.step;
            
            return (
              <div key={node.step} className="relative flex flex-col items-start text-left">
                {/* Node bubble */}
                <div 
                  className={`absolute -left-8 top-0.5 w-6.5 h-6.5 rounded-full border flex items-center justify-center transition-all ${isCompleted ? 'bg-primary-500 border-primary-500 text-white shadow-sm' : isActive ? 'bg-white dark:bg-slate-900 border-primary-500 text-primary-500 ring-4 ring-primary-500/10' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-white' : isActive ? 'bg-primary-500 animate-ping' : 'bg-slate-200 dark:bg-slate-850'}`} />
                </div>

                {/* Node Metadata */}
                <div>
                  <h4 className={`text-xs sm:text-sm font-extrabold ${isActive ? 'text-primary-600' : isCompleted ? 'text-slate-700 dark:text-slate-350' : 'text-slate-400'}`}>
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-slate-450 font-medium leading-relaxed mt-1">
                    {node.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Delivery address summary box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[36px] p-6 sm:p-8 shadow-premium mb-8 text-left">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-4">Delivery Summaries</h3>
        
        <div className="flex flex-col gap-4 text-xs font-bold text-slate-655 dark:text-slate-350">
          <div className="flex gap-3 items-start">
            <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase">Shipping Address</span>
              <p className="text-slate-750 dark:text-slate-200 font-extrabold mt-1 leading-relaxed">{order.address}</p>
            </div>
          </div>
          <div className="flex gap-3 items-start border-t border-slate-50 dark:border-slate-850 pt-4">
            <Clock className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase">Scheduled Window</span>
              <p className="text-slate-750 dark:text-slate-200 font-extrabold mt-1">{order.slot}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex-grow py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
        >
          <ShoppingBag className="w-4.5 h-4.5" />
          Continue Shopping
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </div>

    </motion.div>
  );
};
