import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Package, Eye, Tag, Sparkles, CheckCircle2, RotateCcw, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export const VendorDashboard = () => {
  const { productsList, addProduct, toggleAvailability } = useCart();

  // Form States
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('fruits-veggies');
  const [unit, setUnit] = useState('500g');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);

  // Unsplash Image presets for testing
  const imagePresets = [
    { label: '🥦 Fresh Greens', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
    { label: '🍊 Fresh Juices', url: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80' },
    { label: '🥛 Fresh Milk', url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },
    { label: '🍿 Potato Chips', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80' },
    { label: '🍞 Whole Wheat Bread', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !originalPrice) return;

    const matchedCategory = categories.find(c => c.id === categoryId);
    
    const newProduct = {
      id: 'vendor-' + Date.now(),
      name: name.trim(),
      category: matchedCategory ? matchedCategory.name : 'Groceries',
      categoryId,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discount: Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100),
      rating: 5.0, // Brand new items get perfect score!
      reviews: 1,
      unit,
      image,
      description: description.trim() || 'Ultra-fresh quality grocery product uploaded directly by local partner vendor.',
      inStock,
      isTrending: false,
      isDailyEssential: false,
      isFeaturedDeal: true // Add to savings deals!
    };

    addProduct(newProduct);
    
    // Reset Form
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
  };

  // Preview Calculations
  const previewDiscount = originalPrice && price && Number(originalPrice) > Number(price)
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      
      {/* Dashboard header banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-850 to-slate-900 border border-slate-800 text-white rounded-[32px] p-6 sm:p-10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden text-left">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Package className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-black text-emerald-400 tracking-wider uppercase block">Partner Dashboard</span>
            <h2 className="text-2xl font-black mt-1">
              Ez Kirana <span className="text-primary-500">Seller Hub</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
              Upload local catalog fresh stock and toggle availability values instantly.
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 z-10 text-xs font-black">
          <div className="bg-slate-800/85 px-4 py-3 border border-slate-700/60 rounded-2xl">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-none">Catalog count</p>
            <p className="text-base text-emerald-400 mt-1">{productsList.length} Items</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1. Left pane: Add Product Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 sm:p-8 shadow-premium text-left">
          <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-6 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-primary-500" />
            Upload New Product
          </h3>

          <form onSubmit={handleUploadSubmit} className="flex flex-col gap-5 text-xs font-bold text-slate-655 dark:text-slate-350">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Product Brand & Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Organic Red Strawberries"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Category Selection</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none dark:text-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Unit Size</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 250g, 1 L, 6 pcs"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Seller Price (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="79"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400">Original Price (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="99"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none dark:text-white"
                />
              </div>
            </div>

            {/* Image URLs input & presets */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase text-slate-400">Product Image URL</label>
              <input
                type="text"
                required
                placeholder="Paste an Unsplash image URL..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none dark:text-white"
              />

              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[9px] text-slate-400 font-extrabold uppercase shrink-0 py-1.5">Presets:</span>
                {imagePresets.map(preset => (
                  <button
                    type="button"
                    key={preset.label}
                    onClick={() => setImage(preset.url)}
                    className={`px-2.5 py-1.5 rounded-xl border text-[10px] transition-all cursor-pointer font-bold ${image === preset.url ? 'bg-primary-500 text-white border-primary-500 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-800'}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase text-slate-400">Product Description</label>
              <textarea
                rows="3"
                placeholder="Details of harvesting, nutrient value, storage guidelines, recipe notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl px-4 py-3 focus:outline-none resize-none dark:text-white font-bold"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-850 pt-5 mt-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4.5 h-4.5 rounded text-primary-500 border-slate-350 dark:border-slate-700"
                />
                <span>Mark Item as Instantly Available (In Stock)</span>
              </label>

              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg text-white font-black text-xs rounded-xl flex items-center gap-1.5 tracking-wide cursor-pointer transition-all active:scale-[0.98]"
              >
                Upload Product to Store
                <Sparkles className="w-4 h-4 fill-current text-white" />
              </button>
            </div>

          </form>
        </div>

        {/* 2. Right pane: Real-time Card Preview */}
        <div className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 shadow-premium text-left">
            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm mb-4 flex items-center gap-1.5">
              <Eye className="w-4.5 h-4.5 text-primary-500" />
              Live Shop-Card Preview
            </h3>

            {/* Simulated product card */}
            <div className="border border-slate-100 dark:border-slate-800/80 rounded-3xl p-4 flex flex-col gap-3 relative shadow-inner bg-slate-50/30 dark:bg-slate-850/10">
              
              {/* discount badge */}
              {previewDiscount > 0 && inStock && (
                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {previewDiscount}% OFF
                </span>
              )}

              {/* image preview */}
              <div className="w-full aspect-square bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800/40 rounded-2xl flex items-center justify-center p-2 overflow-hidden shrink-0">
                <img
                  src={image}
                  alt="preview"
                  className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>

              {/* meta details preview */}
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-primary-600 tracking-wider uppercase mb-0.5">
                  {categories.find(c => c.id === categoryId)?.name || 'Fruits & Vegetables'}
                </span>
                <h4 className="font-bold text-slate-800 dark:text-white text-xs line-clamp-1 min-h-[16px]">
                  {name || 'Red Organic Tomatoes'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded-md">
                    <span className="text-[10px] font-black text-amber-500">5.0★</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{unit}</span>
                </div>
              </div>

              {/* pricing preview */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-slate-850 dark:text-white">₹{price || '0'}</span>
                  {Number(originalPrice) > Number(price) && (
                    <span className="text-[10px] text-slate-400 line-through">₹{originalPrice}</span>
                  )}
                </div>

                <button
                  type="button"
                  disabled
                  className="border border-primary-500 text-primary-500 bg-white font-extrabold text-[10px] px-4 py-1.5 rounded-lg cursor-not-allowed uppercase"
                >
                  {inStock ? 'ADD +' : 'Sold Out'}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 3. Catalog Listing & Stock Toggles */}
      <section className="mt-12 text-left">
        <h3 className="font-extrabold text-slate-800 dark:text-white text-base mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary-500" />
          Active Store Catalog & Stocks Management
        </h3>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-655 dark:text-slate-300">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800/80 font-black text-[10px] tracking-widest text-slate-450 uppercase">
                  <th className="pb-3.5 pl-2">Product Details</th>
                  <th className="pb-3.5">Category</th>
                  <th className="pb-3.5">Unit</th>
                  <th className="pb-3.5">Price Ledger</th>
                  <th className="pb-3.5 text-center">Availability Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                {productsList.map(product => {
                  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                  
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors">
                      <td className="py-3.5 pl-2 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl bg-slate-50 p-1 object-cover shrink-0"
                        />
                        <div>
                          <p className="font-black text-slate-800 dark:text-white text-sm line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">ID: {product.id}</p>
                        </div>
                      </td>
                      <td className="py-3.5 font-bold">{product.category}</td>
                      <td className="py-3.5 font-bold text-slate-450">{product.unit}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1.5 font-black text-slate-800 dark:text-white">
                          <span>₹{product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-slate-400 line-through font-bold">₹{product.originalPrice}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => toggleAvailability(product.id)}
                          className="mx-auto flex items-center gap-1.5 focus:outline-none transition-transform active:scale-95 cursor-pointer"
                          title="Toggle availability status"
                        >
                          {product.inStock ? (
                            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-xl text-green-600 dark:text-green-400 font-extrabold text-[10px]">
                              <ToggleRight className="w-5 h-5 fill-current text-green-500 stroke-none" />
                              <span>IN STOCK</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl text-rose-600 dark:text-rose-400 font-extrabold text-[10px]">
                              <ToggleLeft className="w-5 h-5 fill-current text-rose-400 stroke-none" />
                              <span>SOLD OUT</span>
                            </div>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </motion.div>
  );
};
