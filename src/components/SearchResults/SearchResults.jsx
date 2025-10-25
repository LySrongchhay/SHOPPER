// pages/SearchResults.js
import React, { useContext, useState } from 'react';
import { ShopContext } from '../../contexts/ShopContext';
import Item from '../item/Item.jsx';

const SearchResults = () => {
    const { searchResults, searchTerm } = useContext(ShopContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');

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

    // SIMPLIFIED: Always show all categories (no checking for products)
    const categories = ['all', 'men', 'women', 'kid'];

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">
                    Search Results for "{searchTerm}"
                </h1>
                <p className="text-gray-600 mb-4">
                    Found {filteredProducts.length} products
                </p>
                
                {/* Simple Filters Row */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category:</label>
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : `${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Sort Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Sort by:</label>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="name-a-z">Name: A-Z</option>
                        </select>
                    </div>
                    
                    {/* Clear Filters Button */}
                    {(selectedCategory !== 'all' || sortBy !== 'relevance') && (
                        <div className="flex items-end">
                            <button 
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSortBy('relevance');
                                }}
                                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Results */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No products found for "{searchTerm}"
                        {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
                    </p>
                    {(selectedCategory !== 'all' || sortBy !== 'relevance') && (
                        <button 
                            onClick={() => {
                                setSelectedCategory('all');
                                setSortBy('relevance');
                            }}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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