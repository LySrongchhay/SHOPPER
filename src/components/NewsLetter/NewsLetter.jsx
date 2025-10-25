import React from 'react';

const NewsLetter = () => {
  return (
    <section className="w-[90%] md:w-[65%] mx-auto my-16 md:my-20 py-12 md:py-16 px-4 md:px-6 flex flex-col items-center justify-center gap-6 md:gap-8
                        bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl md:rounded-3xl border border-purple-100 shadow-lg">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center leading-tight px-2">
        Get Exclusive Offers On Your Email
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl px-4">
        Subscribe to our newsletter and be the first to know about special deals and new arrivals
      </p>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-white rounded-full border border-gray-300 
                      shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mx-2">
        <input 
          type="email" 
          placeholder="Your email address..." 
          className="flex-1 px-4 sm:px-6 md:px-8 py-4 md:py-5 text-base md:text-lg text-gray-700 focus:outline-none bg-transparent placeholder-gray-400 w-full" 
        />
        <button className="w-full sm:w-[140px] md:w-[180px] lg:w-[200px] py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-base md:text-lg 
                           hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg
                           hover:shadow-2xl hover:scale-105 active:scale-95 border-l border-blue-500/30">
          Subscribe
        </button>
      </div>

      {/* Additional Info */}
      <p className="text-xs sm:text-sm text-gray-500 text-center mt-2 md:mt-4 flex items-center gap-2 px-4">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></span>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </section>
  );
}

export default NewsLetter;