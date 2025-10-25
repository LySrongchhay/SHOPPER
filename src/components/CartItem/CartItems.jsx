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
    clearCart 
  } = useContext(ShopContext);
  
  const [showThankYou, setShowThankYou] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const navigate = useNavigate();

  // Promo codes configuration
  const promoCodes = {
    "SHOPPER": { discount: 15, type: "fixed", message: "15% off your entire order" },
    "ETEC Center": { discount: 10, type: "percentage", message: "$10 off your order" }
  };

  // Check if cart is empty
  const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

  // Calculate subtotal
  const subtotal = getTotalCartAmount();
  
  // Calculate discount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    const promo = promoCodes[appliedPromo];
    if (promo.type === "percentage") {
      return (subtotal * promo.discount) / 100;
    } else {
      return Math.min(promo.discount, subtotal); // Don't discount more than subtotal
    }
  };

  const discount = calculateDiscount();
  const finalTotal = Math.max(0, subtotal - discount);

  const handleProceedToCheckout = () => {
    if (isCartEmpty) return;
    setShowThankYou(true);
    clearCart();
    setAppliedPromo(null); // Clear applied promo on checkout
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
      // Handle case-sensitive "ETEC Center"
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

  // Calculate total items in cart
  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

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

      {/* Header Row */}
      <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-8 py-5 text-[#454545] text-lg font-semibold border-b border-[#e2e2e2]">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p className="text-center">Remove</p>
      </div>

      {/* Cart Items */}
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div
              key={e.id}
              className="grid grid-cols-2 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-6 md:gap-8 py-5 border-b border-[#e2e2e2] text-[#454545]"
            >
              <img
                className="h-[60px] w-[60px] object-contain"
                src={e.image}
                alt={e.name}
              />
              <p className="font-medium text-[15px] md:text-[17px]">{e.name}</p>
              <p className="hidden md:block">${e.new_price}</p>

              {/* Quantity Buttons */}
              <div className="flex items-center justify-center ml-[-60px]">
                <button
                  onClick={() => removeFromCart(e.id)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="w-[50px] text-center border-t border-b border-gray-300 py-1">
                  {cartItems[e.id]}
                </span>
                <button
                  onClick={() => addToCart(e.id)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <p className="hidden md:block">
                ${e.new_price * cartItems[e.id]}
              </p>

              {/* Remove icon aligned under "Remove" text */}
              <div className="flex justify-center">
                <img
                  className="w-[20px] cursor-pointer hover:scale-110 transition-transform"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="remove"
                />
              </div>
            </div>
          );
        }
        return null;
      })}

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
                setPromoError(""); // Clear error when typing
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
          
          {/* Available Promo Codes */}
          
          {/* <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500 font-semibold">Available Promo Codes:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">SHOPPER</span>
                <span className="text-sm text-gray-600">- 15% off entire order</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">ETEC Center</span>
                <span className="text-sm text-gray-600">- $10 off your order</span>
              </div>
            </div>
          </div> */}
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