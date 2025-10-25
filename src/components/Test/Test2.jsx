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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Modern Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            {categoryName}'s Collection
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the latest trends and exclusive styles for {props.category}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white text-sm">
              {sortedProducts.length} Products Available
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {categoryName}'s Products
            </h2>
            <p className="text-gray-600 mt-1">
              Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Improved Sort Dropdown */}
          <div className="relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px] cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600">
                  We're currently updating our {categoryName.toLowerCase()} collection. Check back soon for new arrivals!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button - Only show if there are products */}
        {sortedProducts.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;