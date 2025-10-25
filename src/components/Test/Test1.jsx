import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import drop_icon from '../components/assets/dropdown_icon.png';
import Item from '../components/item/Item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext); // ✅ fixed typo

  return (
    <div className="shop-category max-w-[1400px] mx-auto px-4">
      {/* Banner */}
      <img 
        className="shopcategory-banner block w-full md:w-[90%] lg:w-[82%] mx-auto my-8 rounded-lg object-cover" 
        src={props.banner} 
        alt="" 
      />

      {/* Top Info */}
      <div className="shopcategory-indexsort flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full md:w-[90%] lg:w-[82%] mx-auto">
        <p className="font-semibold text-gray-700">
          <span className="font-bold">Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort flex items-center gap-2 py-2 px-4 rounded-full border border-gray-400 cursor-pointer hover:bg-gray-100 transition">
          Sort by
          <img className="w-4 h-4 object-contain" src={drop_icon} alt="" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="shopcategory-product w-full md:w-[90%] lg:w-[82%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {all_product?.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                
              />
            );
          }
          return null;
        })}
      </div>
     <div className="shopcategory-loadmore flex justify-center my-16">
        <div className="w-[180px] h-[50px] rounded-[50px] bg-[#ededed] text-[#787878] text-[16px] font-medium flex items-center justify-center cursor-pointer hover:brightness-95 transition mt-[12px]">
          Explore More
        </div>
      </div>


    </div>

  );
};

export default ShopCategory;
