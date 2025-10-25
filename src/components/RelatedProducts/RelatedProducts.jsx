import React from 'react'
import data_product from '../assets/data'
import Item from '../item/Item'

const RelatedProducts = () => {
  return (
    <div className="flex flex-col items-center py-16 px-4 lg:px-0">
      {/* Title */}
      <h1 className="text-[#171717] text-3xl md:text-5xl font-semibold text-center">
        Related Products
      </h1>
      <hr className="w-[120px] md:w-[200px] h-[4px] md:h-[6px] rounded-[10px] bg-[#252525] mt-3" />

      {/* Product Grid - Add items-stretch */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-stretch"> {/* Add items-stretch here */}
        {data_product.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts