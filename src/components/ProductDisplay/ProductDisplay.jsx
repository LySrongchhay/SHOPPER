import React, { useContext, useState } from 'react'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../contexts/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTimeout, setAlertTimeout] = useState(null);

    const images = [product.image, product.image, product.image, product.image];

    const handleAddToCart = () => {
        addToCart(product.id, selectedSize);
        
        // Clear any existing timeout
        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }
        
        // Show alert
        setShowAlert(true);
        
        // Set new timeout to hide alert
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 3000);
        
        setAlertTimeout(timeout);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Success Alert - Top Right (Below Navbar) */}
            {showAlert && (
                <div className="fixed top-20 right-4 z-50 animate-fade-in">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">Added to Cart! </p>
                            <p className="text-sm opacity-90">{product.name} - Size {selectedSize}</p>
                        </div>
                        <button 
                            onClick={handleCloseAlert}
                            className="flex-shrink-0 text-white hover:text-gray-200 transition-colors ml-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side: Image Gallery */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`bg-gray-50 rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                                    selectedImage === index 
                                    ? 'border-red-500 ring-2 ring-red-200' 
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Product Details */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                            {product.name}
                        </h1>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="flex">
                                {[1,2,3,4].map((_, i) => (
                                    <img key={i} src={star_icon} alt="Star" className="h-5 w-5" />
                                ))}
                                <img src={star_dull_icon} alt="Star Dull" className="h-5 w-5" />
                            </div>
                            <span className="text-gray-600 text-sm">(122 Reviews)</span>
                            <span className="text-green-600 text-sm font-medium ml-2">In Stock</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-gray-900">${product.new_price}</span>
                        {product.old_price && (
                            <span className="text-xl text-gray-500 line-through">${product.old_price}</span>
                        )}
                        {product.old_price && (
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                Save ${(product.old_price - product.new_price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Select Size</h3>
                            <button className="text-sm text-gray-500 hover:text-gray-700 underline">
                                Size Guide
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {['XS','S','M','L','XL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 px-4 border-2 rounded-xl font-semibold transition-all duration-200 ${
                                        selectedSize === size
                                        ? 'border-red-500 bg-red-50 text-red-600'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Add to Cart - Size {selectedSize}
                            </button>
                        </div>

                        {/* Quick Features */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Easy Returns
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                1-Year Warranty
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Secure Payment
                            </div>
                        </div>
                    </div>

                    {/* Product Meta */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex">
                                <span className="w-24 font-semibold text-gray-900">Category:</span>
                                <span>{product.category || 'Fashion'}</span>
                            </div>
                            <div className="flex">
                                <span className="w-24 font-semibold text-gray-900">Tags:</span>
                                <span>Modern, Latest, {product.category}, Trending</span>
                            </div>
                            <div className="flex">
                                <span className="w-24 font-semibold text-gray-900">SKU:</span>
                                <span>PROD-{product.id.toString().padStart(4, '0')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add these styles to your CSS file or use Tailwind CSS animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { 
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}

export default ProductDisplay