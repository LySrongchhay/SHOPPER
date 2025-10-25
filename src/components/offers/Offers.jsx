import React from 'react';
import exclusive_image from '../assets/exclusive_image.png';

const Offers = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto my-12">
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              🎯 Limited Time
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Exclusive 
              <span className="text-blue-600 block">Offer</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Special discounts on our <span className="font-semibold text-blue-600">best seller</span> products
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md">
              Shop Now →
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                -50%
              </div>
              <img 
                src={exclusive_image} 
                alt="Exclusive Offer" 
                className="w-64 h-64 object-contain drop-shadow-lg hover:scale-105 transition-transform"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offers;