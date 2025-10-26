import React, { useContext, useState } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";
import { useNavigate, Link } from "react-router-dom";

const CartItems = () => {
  const { 
    getTotalCartAmount, 
    all_product, 
    cartItems, 
    addToCart, 
    removeFromCart,
    removeEntireItem,
    clearCart 
  } = useContext(ShopContext);
  
  const [showThankYou, setShowThankYou] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [editingSize, setEditingSize] = useState(null);
  const navigate = useNavigate();

  // Promo codes configuration
  const promoCodes = {
    "SHOPPER": { discount: 15, type: "fixed", message: "$15 off your entire order" },
    "ETEC Center": { discount: 10, type: "percentage", message: "10% off your order" }
  };

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0 || 
    Object.values(cartItems).every(item => Object.keys(item).length === 0);

  // Calculate subtotal
  const subtotal = getTotalCartAmount();
  
  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    const promo = promoCodes[appliedPromo];
    if (promo.type === "percentage") {
      return (subtotal * promo.discount) / 100;
    } else {
      return Math.min(promo.discount, subtotal);
    }
  };

  const discount = calculateDiscount();
  const finalTotal = Math.max(0, subtotal - discount);

  // Get all cart items with sizes
  const getCartItemsWithSizes = () => {
    const items = [];
    for (const itemId in cartItems) {
      const itemSizes = cartItems[itemId];
      for (const size in itemSizes) {
        if (itemSizes[size] > 0) {
          const product = all_product.find(p => p.id === Number(itemId));
          if (product) {
            items.push({
              product,
              size,
              quantity: itemSizes[size],
              total: product.new_price * itemSizes[size],
              key: `${itemId}-${size}`
            });
          }
        }
      }
    }
    return items;
  };

  const cartItemsWithSizes = getCartItemsWithSizes();

  // Calculate total items in cart
  const totalItems = cartItemsWithSizes.reduce((sum, item) => sum + item.quantity, 0);

  // Function to change size
  const changeSize = (itemId, oldSize, newSize) => {
    if (oldSize === newSize) {
      setEditingSize(null);
      return;
    }

    // Get current quantity
    const currentQuantity = cartItems[itemId][oldSize];
    
    // Remove from old size
    removeEntireItem(itemId, oldSize);
    
    // Add to new size with same quantity
    for (let i = 0; i < currentQuantity; i++) {
      addToCart(itemId, newSize);
    }
    
    setEditingSize(null);
  };

  const handleProceedToCheckout = () => {
    if (isCartEmpty) return;
    setShowThankYou(true);
    clearCart();
    setAppliedPromo(null);
  };

  const handleContinueShopping = () => {
    setShowThankYou(false);
    navigate("/");
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    const upperCasePromo = promoCode.toUpperCase();
    
    if (promoCodes[upperCasePromo]) {
      setAppliedPromo(upperCasePromo);
      setPromoError("");
      setPromoCode("");
    } else if (promoCodes[promoCode]) {
      setAppliedPromo(promoCode);
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code. Please try again.");
      setAppliedPromo(null);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  if (isCartEmpty && !showThankYou) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 my-20 text-center">
        <div className="bg-gray-50 rounded-2xl p-12 md:p-16 shadow-sm">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5-5.5h5m-5 0v5m0-5l-2.5 5.5" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
          </p>
          <button 
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 max-w-md w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully and your cart has been cleared.
          </p>
          <button 
            onClick={handleContinueShopping}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 my-6">
      {/* Cart Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Shopping Cart</h1>
        <p className="text-gray-600 text-sm">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden lg:grid grid-cols-[80px_1fr_100px_100px_120px_100px_80px] items-center gap-4 py-5 text-[#454545] text-lg font-semibold border-b border-[#e2e2e2]">
        <p className="text-center">Product</p>
        <p>Title</p>
        <p className="text-center">Size</p>
        <p className="text-center">Price</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Total</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Cart Items */}
      <div className="space-y-3">
        {cartItemsWithSizes.map((item) => (
          <div key={item.key}>
            {/* Desktop View */}
            <div className="hidden lg:grid grid-cols-[80px_1fr_100px_100px_120px_100px_80px] items-center gap-4 py-5 border-b border-[#e2e2e2] text-[#454545]">
              {/* Product Image */}
              <div className="flex justify-center">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    className="h-[60px] w-[60px] object-contain cursor-pointer hover:scale-105 transition-transform"
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </Link>
              </div>

              {/* Product Title */}
              <Link to={`/product/${item.product.id}`} className="hover:text-blue-600 transition-colors">
                <p className="font-medium text-[17px] text-gray-800 cursor-pointer">
                  {item.product.name}
                </p>
              </Link>
              
              {/* Size Display/Edit */}
              <div className="flex flex-col items-center gap-1">
                {editingSize === item.key ? (
                  <div className="flex flex-col items-center gap-2">
                    <select 
                      defaultValue={item.size}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onChange={(e) => changeSize(item.product.id, item.size, e.target.value)}
                    >
                      {['XS','S','M','L','XL'].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => setEditingSize(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-medium">Size {item.size}</span>
                    <button 
                      onClick={() => setEditingSize(item.key)}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>

              {/* Price */}
              <p className="text-center font-medium">${item.product.new_price}</p>

              {/* Quantity Buttons */}
              <div className="flex items-center justify-center gap-0">
                <button
                  onClick={() => removeFromCart(item.product.id, item.size)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors rounded-l"
                >
                  -
                </button>
                <span className="w-12 text-center border-y border-gray-300 py-1 font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item.product.id, item.size)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors rounded-r"
                >
                  +
                </button>
              </div>

              {/* Total */}
              <p className="text-center font-semibold">
                ${item.total.toFixed(2)}
              </p>

              {/* Remove icon */}
              <div className="flex justify-center">
                <img
                  className="w-[20px] cursor-pointer hover:scale-110 transition-transform"
                  src={remove_icon}
                  onClick={() => removeEntireItem(item.product.id, item.size)}
                  alt="remove"
                />
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden bg-white rounded-xl border border-gray-200 p-3">
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      className="h-16 w-16 object-contain rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </Link>
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-2">
                      <Link to={`/product/${item.product.id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 cursor-pointer">
                          {item.product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-red-600 text-base">
                          ${item.product.new_price}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-600">Size:</span>
                          {editingSize === item.key ? (
                            <select 
                              defaultValue={item.size}
                              className="px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onChange={(e) => changeSize(item.product.id, item.size, e.target.value)}
                            >
                              {['XS','S','M','L','XL'].map(size => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                {item.size}
                              </span>
                              <button 
                                onClick={() => setEditingSize(item.key)}
                                className="text-blue-600 hover:text-blue-800 text-xs underline"
                              >
                                Change
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeEntireItem(item.product.id, item.size)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <img src={remove_icon} alt="remove" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity and Total Row */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1.5">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600 font-medium">Qty:</span>
                      <div className="flex items-center gap-0 bg-white rounded border border-gray-300">
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
                        >
                          −
                        </button>
                        <span className="w-8 text-center py-1 font-semibold text-gray-900 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item.product.id, item.size)}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-medium">Total</p>
                      <p className="font-bold text-gray-900 text-sm">
                        ${item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section - Mobile Optimized */}
      <div className="mt-6 space-y-6 lg:flex lg:space-y-0 lg:gap-8">
        {/* Totals Section */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-3">Cart Totals</h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Subtotal</span>
              <span className="font-semibold text-sm">${subtotal.toFixed(2)}</span>
            </div>
            
            {/* Applied Promo Code */}
            {appliedPromo && (
              <>
                <div className="flex justify-between items-center text-green-600">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Discount</span>
                    <button 
                      onClick={removePromoCode}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <span className="font-semibold text-sm">-${discount.toFixed(2)}</span>
                </div>
              </>
            )}
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Shipping</span>
                <span className="text-green-600 font-semibold text-sm">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className={`font-bold text-lg ${appliedPromo ? "text-green-600" : "text-gray-900"}`}>
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleProceedToCheckout}
            className="w-full mt-4 h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          >
            CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-3">Promo Code</h2>
          
          {/* Success Message */}
          {appliedPromo && (
            <div className="mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="block text-sm">Promo Applied!</strong>
                </div>
                <button 
                  onClick={removePromoCode}
                  className="text-green-700 hover:text-green-900 font-semibold text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {promoError && (
            <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {promoError}
            </div>
          )}

          <form onSubmit={handlePromoSubmit} className="flex gap-2">
            <input
              className="flex-1 px-3 py-3 bg-gray-100 rounded-lg outline-none text-sm border border-transparent focus:border-blue-500 transition-colors"
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromoError("");
              }}
              disabled={!!appliedPromo}
            />
            <button 
              type="submit"
              className="px-4 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
              disabled={!promoCode.trim() || !!appliedPromo}
            >
              {appliedPromo ? "Applied" : "Apply"}
            </button>
          </form>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CartItems;