import React, { useContext, useState } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

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
    "SHOPPER": { discount: 15, type: "fixed", message: "15% off your entire order" },
    "ETEC Center": { discount: 10, type: "percentage", message: "$10 off your order" }
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
      setPromoError("Invalid promo code. Try 'SHOPPER' or 'ETEC Center'");
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
    <div className="cartitems max-w-[1200px] mx-auto px-4 md:px-8 my-20">
      {/* Cart Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {/* Header Row - FIXED ALIGNMENT */}
      <div className="hidden md:grid grid-cols-[80px_1fr_100px_100px_120px_100px_80px] items-center gap-4 py-5 text-[#454545] text-lg font-semibold border-b border-[#e2e2e2]">
        <p className="text-center">Product</p>
        <p>Title</p>
        <p className="text-center">Size</p>
        <p className="text-center">Price</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Total</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Cart Items - FIXED ALIGNMENT */}
      {cartItemsWithSizes.map((item, index) => (
        <div
          key={item.key}
          className="grid grid-cols-2 md:grid-cols-[80px_1fr_100px_100px_120px_100px_80px] items-center gap-4 py-5 border-b border-[#e2e2e2] text-[#454545]"
        >
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              className="h-[60px] w-[60px] object-contain"
              src={item.product.image}
              alt={item.product.name}
            />
          </div>

          {/* Product Title */}
          <p className="font-medium text-[15px] md:text-[17px] text-gray-800">
            {item.product.name}
          </p>
          
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
      ))}

      {/* Bottom Section */}
      <div className="cartitem-down flex flex-col md:flex-row justify-between gap-10 mt-20">
        {/* Totals */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">Cart Totals</h1>
          <div className="text-[16px] bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between py-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            
            {/* Applied Promo Code */}
            {appliedPromo && (
              <>
                <div className="flex justify-between py-2 text-green-600">
                  <div className="flex items-center gap-2">
                    <span>Discount ({appliedPromo})</span>
                    <button 
                      onClick={removePromoCode}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <p>-${discount.toFixed(2)}</p>
                </div>
                <div className="text-sm text-green-600 mb-2">
                  {promoCodes[appliedPromo].message}
                </div>
              </>
            )}
            
            <hr className="my-3" />
            <div className="flex justify-between py-2">
              <p>Shipping Fee</p>
              <p className="text-green-600">Free</p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between py-2 font-semibold text-lg">
              <h3>Total</h3>
              <h3 className={appliedPromo ? "text-green-600" : ""}>
                ${finalTotal.toFixed(2)}
                {appliedPromo && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${subtotal.toFixed(2)}
                  </span>
                )}
              </h3>
            </div>
          </div>
          <button 
            onClick={handleProceedToCheckout}
            className="w-full md:w-[262px] h-[58px] bg-[#ff5a5a] text-white text-[16px] font-semibold rounded-md hover:bg-[#e14d4d] transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code */}
        <div className="flex-1 text-[16px] font-medium">
          <p className="text-[#555] mb-2">
            If you have a promo code, enter it here:
          </p>
          
          {/* Success Message */}
          {appliedPromo && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Promo Applied!</strong>
                  <p className="text-sm">{promoCodes[appliedPromo].message}</p>
                </div>
                <button 
                  onClick={removePromoCode}
                  className="text-green-700 hover:text-green-900"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {promoError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {promoError}
            </div>
          )}

          <form onSubmit={handlePromoSubmit} className="flex w-full md:w-[504px] bg-[#eaeaea] rounded-md overflow-hidden h-[64px]">
            <input
              className="flex-1 px-4 bg-transparent outline-none text-[16px]"
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
              className="w-[130px] bg-black text-white text-[16px] font-medium hover:bg-gray-800 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
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
      `}</style>
    </div>
  );
};

export default CartItems;