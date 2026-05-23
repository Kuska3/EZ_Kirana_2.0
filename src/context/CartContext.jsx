import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [productsList, setProductsList] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  const [coupon, setCoupon] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(productsList));
  }, [productsList]);


  // Toast System
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        addToast(`Increased quantity of ${product.name}!`, 'success');
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      addToast(`Added ${product.name} to cart!`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    if (item) {
      addToast(`Removed ${item.name} from cart.`, 'info');
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  // Coupons Database
  const availableCoupons = [
    { code: 'KIRANA100', description: 'Flat ₹100 Off on orders above ₹499', minOrder: 499, discount: 100, type: 'flat' },
    { code: 'EZ20', description: '20% Off up to ₹75 on orders above ₹299', minOrder: 299, discount: 20, type: 'percent', maxDiscount: 75 },
    { code: 'FREESHIP', description: 'Free Delivery on any order size', minOrder: 0, discount: 35, type: 'shipping' }
  ];

  const applyCoupon = (code) => {
    const c = availableCoupons.find(coupon => coupon.code.toUpperCase() === code.toUpperCase());
    if (!c) {
      addToast('Invalid coupon code.', 'error');
      return false;
    }

    if (cartSubtotal < c.minOrder) {
      addToast(`Minimum order of ₹${c.minOrder} required for this coupon.`, 'error');
      return false;
    }

    setCoupon(c);
    addToast(`Coupon "${c.code}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Financial Calculations
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savingsTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);
  
  // GST 5% standard grocery rate
  const gst = Math.round(cartSubtotal * 0.05);

  // Delivery fee is flat ₹35, waived off above ₹300, or if shipping coupon is applied
  const isFreeDelivery = cartSubtotal >= 300 || (coupon && coupon.type === 'shipping');
  const deliveryFee = cartSubtotal === 0 ? 0 : (isFreeDelivery ? 0 : 35);

  // Coupon discount calculations
  let couponDiscount = 0;
  if (coupon && cartSubtotal >= coupon.minOrder) {
    if (coupon.type === 'flat') {
      couponDiscount = coupon.discount;
    } else if (coupon.type === 'percent') {
      couponDiscount = Math.min(Math.round((cartSubtotal * coupon.discount) / 100), coupon.maxDiscount || 9999);
    } else if (coupon.type === 'shipping') {
      couponDiscount = 0; // Already waived deliveryFee
    }
  }

  const addProduct = (newProduct) => {
    setProductsList(prev => [newProduct, ...prev]);
    addToast(`Product "${newProduct.name}" uploaded successfully by vendor!`, 'success');
  };

  const toggleAvailability = (productId) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === productId) {
        const nextStock = !p.inStock;
        addToast(`Marked "${p.name}" as ${nextStock ? 'In Stock' : 'Out of Stock'}.`, 'info');
        return { ...p, inStock: nextStock };
      }
      return p;
    }));
  };

  const cartTotal = Math.max(0, cartSubtotal + gst + deliveryFee - couponDiscount);

  return (
    <CartContext.Provider value={{
      cartItems,
      productsList,
      toasts,
      coupon,
      availableCoupons,
      cartSubtotal,
      savingsTotal,
      gst,
      deliveryFee,
      couponDiscount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      addToast,
      removeToast,
      addProduct,
      toggleAvailability
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
