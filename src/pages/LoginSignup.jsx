import React from 'react'

const LoginSignup = () => {
  return (
    <div className="login-signup w-full min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="login-signup-container w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Join us and start shopping
          </p>
        </div>

        {/* Input Fields */}
        <div className="login-signup-fields flex flex-col gap-4 sm:gap-6">
          <div className="relative">
            <input
              className="w-full h-14 sm:h-16 px-4 border border-gray-300 rounded-xl text-gray-700 text-base sm:text-lg outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div className="relative">
            <input
              className="w-full h-14 sm:h-16 px-4 border border-gray-300 rounded-xl text-gray-700 text-base sm:text-lg outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="relative">
            <input
              className="w-full h-14 sm:h-16 px-4 border border-gray-300 rounded-xl text-gray-700 text-base sm:text-lg outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        {/* Button */}
        <button className="w-full h-14 sm:h-16 bg-gradient-to-r from-pink-500 to-red-500 text-white text-lg sm:text-xl font-semibold rounded-xl mt-6 hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
          Continue
        </button>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mt-4 text-gray-600 text-xs sm:text-sm">
          <input 
            type="checkbox" 
            className="w-4 h-4 mt-1 accent-pink-500 flex-shrink-0" 
          />
          <p className="leading-tight">
            By continuing, I agree to the terms of use & privacy policy
          </p>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-base">
            Already have an account?{" "}
            <button className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup