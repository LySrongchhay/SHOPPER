// components/item/Item.jsx - FIXED VERSION
import React from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <Link to={`/product/${props.id}`} className="block h-full">
      <div className="item bg-white rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden w-full max-w-sm mx-auto group flex flex-col h-full">
        {/* Product Image - Keep height but add padding */}
        <div className="relative overflow-hidden flex-shrink-0 p-1"> {/* Added padding */}
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.image}
            alt={props.name}
            className="w-full h-64 sm:h-72 object-cover object-top group-hover:scale-105 transition-transform duration-300 rounded-lg" /* Added rounded */
          />
        </div>

        {/* Product Info - Fixed spacing */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {props.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed flex-grow">
            {props.description}
          </p>

          {/* Price section - sticks to bottom */}
          <div className="flex items-center gap-3 flex-wrap mt-2"> {/* Reduced margin-top */}
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ${props.new_price}
            </span>
            {props.old_price && (
              <span className="text-sm sm:text-base text-gray-500 font-medium line-through">
                ${props.old_price}
              </span>
            )}
            {props.old_price && (
              <span className="text-xs sm:text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Save ${(props.old_price - props.new_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Item