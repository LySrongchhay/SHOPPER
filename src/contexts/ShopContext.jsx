import React, { createContext, useState } from "react";
import all_product from '../components/assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = {}; // Changed from 0 to empty object to store sizes
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Search function
    const handleSearch = (term) => {
        const trimmedTerm = term.trim();
        setSearchTerm(term);
        
        if (!trimmedTerm) {
            setSearchResults([]);
            return;
        }
        
        const lowerTerm = trimmedTerm.toLowerCase();
        const filtered = all_product.filter(product => {
            const searchText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
            return searchText.includes(lowerTerm);
        });
        
        setSearchResults(filtered);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    // UPDATED CART FUNCTIONS WITH SIZE SUPPORT
    const addToCart = (itemId, size = 'M') => {
        setCartItems((prev) => {
            const currentItem = prev[itemId] || {};
            const currentQuantity = currentItem[size] || 0;
            
            return {
                ...prev, 
                [itemId]: {
                    ...currentItem,
                    [size]: currentQuantity + 1
                }
            };
        });
    };
    
    const removeFromCart = (itemId, size = null) => {
        setCartItems((prev) => {
            const currentItem = prev[itemId] || {};
            
            // If no size specified, remove one from any size
            if (!size) {
                const sizes = Object.keys(currentItem);
                if (sizes.length === 0) return prev;
                
                const firstSize = sizes[0];
                const newQuantity = currentItem[firstSize] > 1 ? currentItem[firstSize] - 1 : 0;
                
                if (newQuantity === 0) {
                    const { [firstSize]: removed, ...restSizes } = currentItem;
                    if (Object.keys(restSizes).length === 0) {
                        const { [itemId]: removedItem, ...rest } = prev;
                        return rest;
                    }
                    return { ...prev, [itemId]: restSizes };
                }
                
                return { 
                    ...prev, 
                    [itemId]: { ...currentItem, [firstSize]: newQuantity } 
                };
            }
            
            // Remove specific size
            const currentQuantity = currentItem[size] || 0;
            if (currentQuantity > 1) {
                return { 
                    ...prev, 
                    [itemId]: { ...currentItem, [size]: currentQuantity - 1 } 
                };
            } else {
                const { [size]: removed, ...restSizes } = currentItem;
                if (Object.keys(restSizes).length === 0) {
                    const { [itemId]: removedItem, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [itemId]: restSizes };
            }
        });
    };

    const removeEntireItem = (itemId, size) => {
        setCartItems((prev) => {
            const currentItem = prev[itemId] || {};
            const { [size]: removed, ...restSizes } = currentItem;
            
            if (Object.keys(restSizes).length === 0) {
                const { [itemId]: removedItem, ...rest } = prev;
                return rest;
            }
            
            return { ...prev, [itemId]: restSizes };
        });
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const itemId in cartItems){
            const itemSizes = cartItems[itemId];
            for(const size in itemSizes){
                if(itemSizes[size] > 0){
                    let itemInfo = all_product.find((product) => product.id === Number(itemId));
                    totalAmount += itemInfo.new_price * itemSizes[size];
                }     
            }
        }
        return totalAmount;
    };
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const itemId in cartItems){
            const itemSizes = cartItems[itemId];
            for(const size in itemSizes){
                if(itemSizes[size] > 0){
                    totalItem += itemSizes[size];
                }
            }
        }
        return totalItem;
    };

    const contextValue = {
        // Cart functionality
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        removeEntireItem,
        clearCart,
        
        // Search functionality
        searchTerm,
        searchResults,
        handleSearch,
        clearSearch
    }
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider> 
    )
}

export default ShopContextProvider;