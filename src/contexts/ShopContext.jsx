import React, { createContext, useState } from "react";
import all_product from '../components/assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;       
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    // SIMPLIFIED SEARCH STATE - only what we actually use
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // SIMPLIFIED SEARCH FUNCTION
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

    // SIMPLE CLEAR SEARCH
    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    // YOUR EXISTING CART FUNCTIONS (keep as is)
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    };
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
        }));
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }     
        }
        return totalAmount;
    };
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems){
            if(cartItems[item] > 0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // SIMPLIFIED contextValue - only what we actually use
    const contextValue = {
        // Cart functionality
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        
        // Search functionality (only essentials)
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