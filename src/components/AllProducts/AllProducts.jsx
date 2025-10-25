import React, { useState, useContext } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import Item from '../item/Item.jsx';

const AllProducts = () => {
  const { all_product } = useContext(ShopContext);
  const [displayCount, setDisplayCount] = useState(20);
  const [sortOption, setSortOption] = useState('default');

  // Sort products
  const sortedProducts = [...all_product].sort((a, b) => {
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

  const displayedProducts = sortedProducts.slice(0, displayCount);
  const hasMoreProducts = displayCount < sortedProducts.length;
  const hasLessProducts = displayCount > 20;

  const loadMore = () => {
    setDisplayCount(prevCount => prevCount + 20);
  };

  const showAll = () => {
    setDisplayCount(sortedProducts.length);
  };

  const showLess = () => {
    setDisplayCount(20);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover our complete collection of {sortedProducts.length} amazing products
        </p>
      </div>

      {/* Sort and Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
        <div className="text-gray-600">
          Showing <span className="font-bold text-blue-600">{displayedProducts.length}</span> of{' '}
          <span className="font-bold text-gray-900">{sortedProducts.length}</span> products
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort by Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {displayedProducts.map((item) => (
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Load More & Show All when there are more products */}
        {hasMoreProducts && (
          <>
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Load More (20 Products)
            </button>
            
            <button
              onClick={showAll}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              Show All Products
            </button>
          </>
        )}

        {/* Show Less when more than 20 products are displayed */}
        {hasLessProducts && (
          <button
            onClick={showLess}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Show Less
          </button>
        )}
      </div>

      {/* Show All Message */}
      {!hasMoreProducts && sortedProducts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            You've viewed all {sortedProducts.length} products!
          </p>
        </div>
      )}

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-600">Check back later for new arrivals!</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;