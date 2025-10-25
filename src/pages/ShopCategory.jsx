import React, { useContext, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { FiChevronDown } from 'react-icons/fi';
import Item from '../components/item/Item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('default');
  
  // Filter products by category
  const filteredProducts = all_product?.filter(item => props.category === item.category) || [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.new_price - b.new_price;
      case 'price-high-low':
        return b.new_price - a.new_price;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Category display name
  const categoryName = props.category.charAt(0).toUpperCase() + props.category.slice(1);

  // UPDATED BANNER IMAGES - Better kids clothing image
  const bannerImages = {
    men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    women: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    kid: "https://i.pinimg.com/1200x/02/07/72/0207724966eac4ded7a8c24e4b846958.jpg"
  };

  // Fallback banner in case image fails to load
  const defaultBanner = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80";

  const getBannerImage = () => {
    return bannerImages[props.category] || defaultBanner;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner with UPDATED Kids Image */}
      <div className="relative h-80 lg:h-96 overflow-hidden">
        <img
          src={getBannerImage()}
          alt={`${categoryName} Fashion Collection`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = defaultBanner;
          }}
        />
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 flex items-end pb-12 lg:pb-16">
          <div className="text-center w-full text-white px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              {categoryName}'s Fashion
            </h1>
            <p className="text-xl lg:text-2xl mb-6 drop-shadow-md">
              Style That Speaks Volumes
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm inline-block border border-white/30">
              {sortedProducts.length} Unique Styles
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Stats and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Curated for {categoryName}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{sortedProducts.length} Products</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Latest Trends</span>
              </div>
            </div>
          </div>
          
          {/* Sort Dropdown - Clean options without icons */}
          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px] cursor-pointer shadow-sm hover:border-gray-400 transition-colors"
            >
              <option value="default">Sort by Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              ))}
            </div>
            
            {/* Results Summary */}
            <div className="mt-8 text-center bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-gray-600 text-lg">
                Found <span className="font-bold text-blue-600">{sortedProducts.length}</span> amazing products in {categoryName}'s collection
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6">👗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                New Arrivals Coming Soon!
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                We're refreshing the {categoryName.toLowerCase()} collection with exciting new styles. 
                Stay tuned for the latest fashion trends.
              </p>
              <div className="flex gap-3 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                  Get Notified
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all">
                  Browse All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;