import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShoppingBag, CreditCard, ChevronRight, ShieldCheck, Plus, Clock, Tag, X, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    coupon,
    cartSubtotal,
    gst,
    deliveryFee,
    couponDiscount,
    cartTotal,
    clearCart,
    addToast
  } = useCart();

  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Summary, 3: Payment
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [deliverySlot, setDeliverySlot] = useState('instant');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Address form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formTag, setFormTag] = useState('HOME');

  // Credit Card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // UPI VPA state
  const [upiVpa, setUpiVpa] = useState('');

  // Processing payment overlay
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Pre-saved addresses
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", name: "Aarav Mehta", address: "Flat 402, Block C, Green Meadows Apartments, HSR Layout Sector 2, Bengaluru, Karnataka - 560102", tag: "DEFAULT" },
    { id: 2, type: "Office", name: "Aarav Mehta", address: "5th Floor, Block B, Tech Hub Towers, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103", tag: "WORK" }
  ]);

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Your Cart is Empty</h3>
        <p className="text-xs text-slate-400 mt-1">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-6 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl text-xs font-extrabold shadow-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (formName.trim() && formAddress.trim()) {
      const newAddr = {
        id: Date.now(),
        type: formTag === 'HOME' ? 'Home' : 'Office',
        name: formName.trim(),
        address: formAddress.trim(),
        tag: formTag
      };
      setAddresses(prev => [...prev, newAddr]);
      setSelectedAddress(newAddr.id);
      setShowAddressForm(false);
      setFormName('');
      setFormAddress('');
      addToast('New delivery address added!', 'success');
    }
  };

  const handlePlaceOrder = () => {
    // Basic field validation check
    if (paymentMethod === 'upi' && !upiVpa.includes('@')) {
      addToast('Please enter a valid UPI VPA (e.g., username@upi)', 'error');
      return;
    }
    if (paymentMethod === 'card' && (cardNumber.length < 16 || cardCVV.length < 3)) {
      addToast('Please fill in valid Card Details.', 'error');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('Creating secure connection...');

    setTimeout(() => {
      setProcessingStatus('Authenticating transaction credentials...');
    }, 1200);

    setTimeout(() => {
      setProcessingStatus('Finalizing secure payment authorization...');
    }, 2400);

    setTimeout(() => {
      setIsProcessing(false);
      
      // Trigger gorgeous Confetti Explosion!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      // Store current mock checkout data for success page
      const mockOrder = {
        id: 'EZK-' + Math.floor(100000 + Math.random() * 900000),
        address: addresses.find(a => a.id === selectedAddress)?.address || '',
        slot: deliverySlot === 'instant' ? '10-Min Superfast Delivery' : 'Evening Slot (5:00 PM - 7:00 PM)',
        total: cartTotal,
        itemsCount: cartItems.reduce((sum, i) => sum + i.quantity, 0)
      };
      
      localStorage.setItem('lastOrder', JSON.stringify(mockOrder));
      clearCart();
      navigate('/order-success');
    }, 3800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      
      {/* 1. Steps progress tracker banner */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <div className="flex items-center justify-between relative mt-4">
          {/* Progress Connector Line */}
          <div className="absolute left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
          <div 
            className="absolute left-0 h-0.5 bg-primary-500 transition-all duration-500 -z-10"
            style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
          />

          {/* Steps Bubbles */}
          {[
            { step: 1, title: "Address", icon: <MapPin className="w-4 h-4" /> },
            { step: 2, title: "Summary", icon: <ShoppingBag className="w-4 h-4" /> },
            { step: 3, title: "Payment", icon: <CreditCard className="w-4 h-4" /> }
          ].map((item) => (
            <button
              key={item.step}
              disabled={item.step > activeStep}
              onClick={() => setActiveStep(item.step)}
              className={`w-9 h-9 rounded-full flex items-center justify-center border font-bold text-xs transition-all relative ${activeStep === item.step ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-green-500/20' : activeStep > item.step ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600'}`}
            >
              {activeStep > item.step ? <CheckCircle className="w-4.5 h-4.5" /> : item.icon}
              <span className={`absolute top-full mt-2 text-[10px] font-black tracking-wider uppercase whitespace-nowrap ${activeStep === item.step ? 'text-primary-600' : 'text-slate-400'}`}>
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main checkout panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
        
        {/* Left pane: Active Step Content */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Delivery Address selection */}
            {activeStep === 1 && (
              <motion.div
                key="step-address"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-extrabold text-slate-800 dark:text-white text-base">Select Delivery Address</h3>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-1 text-xs font-black text-primary-500 hover:text-primary-600 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add New
                  </button>
                </div>

                {/* Grid address list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={`border rounded-2xl p-4 cursor-pointer relative transition-all ${selectedAddress === addr.id ? 'border-primary-500 bg-primary-500/5' : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40 bg-slate-50/20'}`}
                    >
                      {selectedAddress === addr.id && (
                        <span className="absolute top-4 right-4 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </span>
                      )}
                      <span className="text-[9px] font-black text-slate-450 tracking-wider uppercase border dark:border-slate-700 px-2 py-0.5 rounded-md">
                        {addr.tag}
                      </span>
                      <h4 className="font-black text-slate-800 dark:text-white text-sm mt-3">{addr.type}</h4>
                      <p className="text-xs text-slate-450 font-bold mt-1">{addr.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed line-clamp-3">
                        {addr.address}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Slide down New Address Form */}
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddAddress}
                      className="border-t border-slate-50 dark:border-slate-800 mt-6 pt-6 flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">Add Delivery Address</h4>
                        <button 
                          type="button"
                          onClick={() => setShowAddressForm(false)}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                          <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase">Recipient Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Aarav Mehta"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none dark:text-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                          <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase">Address Tag</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['HOME', 'WORK', 'OTHER'].map(tag => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => setFormTag(tag)}
                                className={`py-2 rounded-xl text-[10px] font-black border transition-all ${formTag === tag ? 'bg-primary-500 border-primary-500 text-white' : 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350'}`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase">Full Delivery Address</label>
                        <textarea
                          required
                          rows="3"
                          placeholder="Flat number, Building, Area, Sector, Landmarks..."
                          value={formAddress}
                          onChange={(e) => setFormAddress(e.target.value)}
                          className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none resize-none dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto self-end px-6 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
                      >
                        Save Address
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Continue button */}
                <div className="border-t border-slate-50 dark:border-slate-850 mt-6 pt-6 flex justify-end">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-650 text-white rounded-2xl text-xs font-extrabold flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    Confirm & Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Order summary & Time slot selection */}
            {activeStep === 2 && (
              <motion.div
                key="step-summary"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium"
              >
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-6">Delivery Schedule</h3>

                {/* Time slot grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div
                    onClick={() => setDeliverySlot('instant')}
                    className={`border rounded-2xl p-4 cursor-pointer flex gap-4 items-center transition-all ${deliverySlot === 'instant' ? 'border-primary-500 bg-primary-500/5' : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800/80 bg-slate-50/20'}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Superfast 10-Min Delivery</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Delivered directly from nearest hub</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliverySlot('evening')}
                    className={`border rounded-2xl p-4 cursor-pointer flex gap-4 items-center transition-all ${deliverySlot === 'evening' ? 'border-primary-500 bg-primary-500/5' : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800/80 bg-slate-50/20'}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-extrabold text-slate-800 dark:text-white text-sm">Evening Delivery (5 PM - 7 PM)</h4>
                      <p className="text-[10px] text-slate-450 font-bold mt-0.5">Perfect for planned dinners</p>
                    </div>
                  </div>
                </div>

                {/* Items preview list */}
                <h4 className="font-extrabold text-xs text-slate-500 tracking-wider uppercase mb-3 text-left">Review Items</h4>
                <div className="flex flex-col gap-4 border border-slate-50 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-850/10 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-bold text-slate-655 dark:text-slate-300">
                      <span className="truncate max-w-[280px] text-slate-800 dark:text-white font-extrabold">{item.name} <span className="text-slate-400 font-bold">({item.unit})</span></span>
                      <span>₹{item.price} × {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Continue button */}
                <div className="border-t border-slate-50 dark:border-slate-800 mt-6 pt-6 flex justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-3 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-extrabold transition-all"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-650 text-white rounded-2xl text-xs font-extrabold flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    Proceed to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Multi-Payment Switcher & Card details */}
            {activeStep === 3 && (
              <motion.div
                key="step-payment"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium"
              >
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-6">Select Payment Method</h3>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left: Swappers */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    {[
                      { id: 'upi', title: 'UPI (GPay / PhonePe)', icon: <Smartphone className="w-4.5 h-4.5" /> },
                      { id: 'card', title: 'Credit / Debit Card', icon: <CreditCard className="w-4.5 h-4.5" /> },
                      { id: 'cod', title: 'Cash on Delivery', icon: <MapPin className="w-4.5 h-4.5" /> }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPaymentMethod(item.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border font-bold text-xs text-left transition-colors cursor-pointer ${paymentMethod === item.id ? 'border-primary-500 bg-primary-500/5 text-primary-600' : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800/80 text-slate-600 dark:text-slate-350 bg-slate-50/20'}`}
                      >
                        {item.icon}
                        {item.title}
                      </button>
                    ))}
                  </div>

                  {/* Right: Dynamic Interactive panels */}
                  <div className="md:col-span-7 border-l border-slate-50 dark:border-slate-800/80 md:pl-8">
                    <AnimatePresence mode="wait">
                      
                      {/* CARD Payment visual flip details */}
                      {paymentMethod === 'card' && (
                        <motion.div
                          key="payment-card"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-6"
                        >
                          {/* visual credit card frame */}
                          <div className="perspective-1000 w-full max-w-sm h-48 mx-auto relative shrink-0">
                            <motion.div
                              animate={{ rotateY: isFlipped ? 180 : 0 }}
                              transition={{ duration: 0.6 }}
                              className="w-full h-full preserve-3d relative rounded-2xl shadow-xl bg-gradient-to-tr from-emerald-500 to-green-600 text-white p-6 flex flex-col justify-between"
                            >
                              {/* Card Front */}
                              <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between rounded-2xl">
                                <div className="flex justify-between items-start">
                                  <span className="font-extrabold text-xs tracking-wider">EZ KIRANA PLATINUM</span>
                                  <div className="w-10 h-7 bg-white/20 rounded-md" /> {/* mock chip */}
                                </div>
                                <div className="text-xl font-bold tracking-widest text-center my-3 text-shadow-md">
                                  {cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                                </div>
                                <div className="flex justify-between items-end">
                                  <div className="flex flex-col">
                                    <span className="text-[8px] text-white/60 font-black">CARDHOLDER</span>
                                    <span className="text-xs font-black tracking-wide uppercase truncate max-w-[150px]">{cardHolder || 'AARAV MEHTA'}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[8px] text-white/60 font-black">EXPIRES</span>
                                    <span className="text-xs font-black">{cardExpiry || 'MM/YY'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Card Back */}
                              <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between bg-gradient-to-tr from-emerald-600 to-green-700 [transform:rotateY(180deg)] rounded-2xl">
                                <div className="w-full h-8 bg-slate-900 absolute left-0 right-0 top-6" /> {/* magnetic stripe */}
                                <div className="flex justify-end items-center mt-12 bg-white text-slate-800 px-3 py-1 rounded-md text-right font-black text-xs h-7 shrink-0 w-max self-end mr-4">
                                  <span className="text-[8px] text-slate-400 mr-2 uppercase">CVV</span>
                                  <span>{cardCVV || '•••'}</span>
                                </div>
                                <div className="text-[8px] text-white/50 text-center font-bold tracking-wider leading-relaxed">
                                  This is a visual mock payment card representing Ez Kirana 2.0 interface checkout logic.
                                </div>
                              </div>

                            </motion.div>
                          </div>

                          {/* Inputs form */}
                          <div className="flex flex-col gap-3 text-xs font-bold text-slate-655 dark:text-slate-350">
                            <div className="flex flex-col gap-1 text-left">
                              <label className="text-[9px] font-black uppercase text-slate-500">Cardholder Name</label>
                              <input
                                type="text"
                                placeholder="Aarav Mehta"
                                value={cardHolder}
                                onFocus={() => setIsFlipped(false)}
                                onChange={(e) => setCardHolder(e.target.value)}
                                className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none dark:text-white"
                              />
                            </div>
                            
                            <div className="flex flex-col gap-1 text-left">
                              <label className="text-[9px] font-black uppercase text-slate-500">Card Number</label>
                              <input
                                type="text"
                                maxLength="16"
                                placeholder="4000123456789010"
                                value={cardNumber}
                                onFocus={() => setIsFlipped(false)}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                                className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none dark:text-white"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1 text-left">
                                <label className="text-[9px] font-black uppercase text-slate-500">Expiry Date</label>
                                <input
                                  type="text"
                                  maxLength="5"
                                  placeholder="MM/YY"
                                  value={cardExpiry}
                                  onFocus={() => setIsFlipped(false)}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none dark:text-white"
                                />
                              </div>
                              <div className="flex flex-col gap-1 text-left">
                                <label className="text-[9px] font-black uppercase text-slate-500">Security CVV</label>
                                <input
                                  type="password"
                                  maxLength="3"
                                  placeholder="•••"
                                  value={cardCVV}
                                  onFocus={() => setIsFlipped(true)}
                                  onBlur={() => setIsFlipped(false)}
                                  onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none dark:text-white"
                                />
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}

                      {/* UPI panel */}
                      {paymentMethod === 'upi' && (
                        <motion.div
                          key="payment-upi"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-4 text-left text-xs"
                        >
                          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">Pay via UPI VPA</h4>
                          <p className="text-[11px] text-slate-450 font-bold leading-relaxed">
                            Specify your standard UPI virtual payment address (VPA) ID. A notification requesting checkout approval will be simulated.
                          </p>
                          <div className="flex flex-col gap-1.5 mt-2">
                            <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider">UPI VPA ID</label>
                            <input
                              type="text"
                              placeholder="aarav@okaxis"
                              value={upiVpa}
                              onChange={(e) => setUpiVpa(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl px-3.5 py-3 text-xs font-extrabold focus:outline-none focus:border-primary-500 dark:text-white"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4 text-[10px] text-slate-400 font-bold">
                            {['@okaxis', '@okicici', '@paytm', '@ybl'].map(suffix => (
                              <button
                                type="button"
                                key={suffix}
                                onClick={() => {
                                  const name = upiVpa.split('@')[0] || 'username';
                                  setUpiVpa(name + suffix);
                                }}
                                className="px-2.5 py-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                              >
                                {suffix}
                              </button>
                            ))}
                          </div>

                        </motion.div>
                      )}

                      {/* Cash on Delivery panel */}
                      {paymentMethod === 'cod' && (
                        <motion.div
                          key="payment-cod"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-left text-xs flex flex-col gap-3"
                        >
                          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">Cash on Delivery (COD)</h4>
                          <p className="text-[11px] text-slate-450 font-bold leading-relaxed">
                            No prepayments required! Simply hand cash or scan delivery partner's UPI QR code at your doorstep upon receiving fresh packages.
                          </p>
                          <div className="bg-emerald-500/10 border border-primary-500/10 rounded-2xl px-4 py-3 flex gap-3 items-center text-primary-750 mt-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">Doorstep digital UPI scanner is supported on COD!</span>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                </div>

                {/* Continue button */}
                <div className="border-t border-slate-50 dark:border-slate-800 mt-8 pt-6 flex justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-3 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-extrabold transition-colors"
                  >
                    Back to Summary
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-3.5 bg-primary-500 hover:bg-primary-650 text-white rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md shadow-green-500/15 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    Place Secure Order (₹{cartTotal})
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right pane: Sticky Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 shadow-premium text-left">
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-4">Checkout Summary</h3>

            {/* Bill lists */}
            <div className="flex flex-col gap-3 font-bold text-xs text-slate-500 dark:text-slate-400 border-b border-slate-50 dark:border-slate-850 pb-5 mb-5">
              <div className="flex justify-between">
                <span>Total Items Bill</span>
                <span className="text-slate-850 dark:text-white font-extrabold">₹{cartSubtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-500 font-extrabold">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5% tax)</span>
                <span className="text-slate-850 dark:text-white font-extrabold">₹{gst}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className={`font-black ${deliveryFee === 0 ? 'text-emerald-500' : 'text-slate-800 dark:text-white'}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline text-slate-800 dark:text-white mb-5">
              <span className="text-sm font-black">Final To Pay</span>
              <span className="text-2xl font-black text-primary-500">₹{cartTotal}</span>
            </div>

            {/* Selected Address preview */}
            <div className="border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-850/15">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Delivering To</span>
              <h4 className="font-extrabold text-slate-750 dark:text-slate-200 text-xs mt-1.5">
                {addresses.find(a => a.id === selectedAddress)?.type} Address
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed line-clamp-2">
                {addresses.find(a => a.id === selectedAddress)?.address}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* 3. Simulated Transaction Loader Modal */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Spinner Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl text-center shadow-2xl flex flex-col items-center gap-6"
            >
              {/* Spinner animation */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="font-extrabold text-slate-800 dark:text-white text-base">Securing Transaction...</h4>
                <p className="text-[11px] text-slate-450 font-bold transition-all duration-300">
                  {processingStatus}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold bg-slate-50 dark:bg-slate-850 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>SSL AES-256 Bit Payment Gateway Active</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
