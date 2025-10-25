import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Summer Collection',
      subtitle: 'Up to 50% Off',
      description: 'Discover the latest trends for this season',
      bgGradient: 'from-blue-500/10 to-purple-500/10'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'New Arrivals',
      subtitle: 'Fresh Styles Added Daily',
      description: 'Be the first to rock the newest designs',

      bgGradient: 'from-pink-500/10 to-orange-500/10'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Limited Time Offer',
      subtitle: 'Free Shipping Worldwide',
      description: 'On all orders over $99',

      bgGradient: 'from-green-500/10 to-teal-500/10'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'Winter Essentials',
      subtitle: 'Stay Warm in Style',
      description: 'Cozy collection for the cold days',

      bgGradient: 'from-purple-500/10 to-blue-500/10'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-50">
      
      {/* Banner Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`}></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                
                {/* Text Content */}
                <div className="text-white text-center lg:text-left space-y-4 sm:space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-yellow-300 drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-lg mx-auto lg:mx-0 drop-shadow-md">
                    {banner.description}
                  </p>
         
                </div>

                {/* Optional: Image on larger screens */}
                <div className="hidden lg:flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center p-4">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 hover:scale-110 active:scale-95"
        aria-label="Previous banner"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-10 hover:scale-110 active:scale-95"
        aria-label="Next banner"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8 sm:w-10 h-3 sm:h-3' 
                : 'bg-white/60 hover:bg-white/80 w-3 sm:w-3 h-3 sm:h-3'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>


    </section>
  );
};

export default Hero;