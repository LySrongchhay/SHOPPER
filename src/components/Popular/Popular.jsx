import React from 'react';
import data_product from '../assets/data';
import Item from '../item/Item';

const Popular = () => {
  return (
    <div className="shop-category max-w-[1400px] mx-auto px-4 pb-[30px]">
      
      {/* Title Section - matching ShopCategory's banner section */}
      <div className="w-full md:w-[90%] lg:w-[82%] mx-auto my-8">
        <h1 className="text-[#171717] text-3xl md:text-5xl font-semibold text-center">
          POPULAR IN WOMEN
        </h1>
        <hr className="w-[120px] md:w-[200px] h-[4px] md:h-[6px] rounded-[10px] bg-[#252525] mt-3 mx-auto" />
      </div>

      {/* Product Grid - Same structure as ShopCategory */}
      <div className="shopcategory-product w-full md:w-[90%] lg:w-[82%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
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
  );
}

export default Popular;