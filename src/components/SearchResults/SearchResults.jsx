// pages/SearchResults.js
import React, { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import Item from '../item/Item.jsx';

const SearchResults = () => {
    const { searchResults, searchTerm } = useContext(ShopContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');

    // All possible categories
    const allCategories = ['all', 'men', 'women', 'kid'];
    
    // Simple filter function
    const getFilteredProducts = () => {
        let filtered = [...searchResults];
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }
        
        // Sort products
        if (sortBy === 'price-low-high') {
            filtered.sort((a, b) => a.new_price - b.new_price);
        } else if (sortBy === 'price-high-low') {
            filtered.sort((a, b) => b.new_price - a.new_price);
        } else if (sortBy === 'name-a-z') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        return filtered;
    };

    const filteredProducts = getFilteredProducts();

    // Get count for each category
    const getCategoryCount = (category) => {
        if (category === 'all') return searchResults.length;
        return searchResults.filter(item => item.category === category).length;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Search Results for "{searchTerm}"
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
            </div>

            {/* Sort and Stats */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
                <div className="text-gray-600">
                    Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> of{' '}
                    <span className="font-bold text-gray-900">{searchResults.length}</span> products
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </div>
                
                {/* Sort dropdown */}
                <div className="flex gap-4">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="relevance">Sort by Relevance</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="name-a-z">Name: A to Z</option>
                    </select>
                </div>
            </div>

            {/* Category Filter Pills - Show all categories */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {allCategories.map(category => {
                    const count = getCategoryCount(category);
                    
                    return (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                            {` (${count})`}
                        </button>
                    );
                })}
            </div>

            {/* Clear Filters Button */}
            {(selectedCategory !== 'all' || sortBy !== 'relevance') && (
                <div className="text-center mb-6">
                    <button 
                        onClick={() => {
                            setSelectedCategory('all');
                            setSortBy('relevance');
                        }}
                        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}

            {/* Results */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                    <p className="text-gray-600 mb-4">
                        No products found for "{searchTerm}"
                        {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
                    </p>
                    {(selectedCategory !== 'all' || sortBy !== 'relevance') && (
                        <button 
                            onClick={() => {
                                setSelectedCategory('all');
                                setSortBy('relevance');
                            }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((item) => (
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
            )}
        </div>
    );
};

export default SearchResults;