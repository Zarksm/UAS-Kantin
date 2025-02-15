import React from "react";
import { IoBagAddOutline } from "react-icons/io5";

const MenuItem = ({ item, addToCart }) => (
  <div className="bg-gray-100 rounded-md p-3 mb-2 flex justify-between md:max-w-56 md:min-w-56">
    <div>
      <p className="font-semibold">{item.name}</p>
      <p className="text-xs text-slate-400">
        Rp. {item.price.toLocaleString()}
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center">
        <IoBagAddOutline
          className={`cursor-pointer  ${
            item.stok === 0
              ? "cursor-not-allowed text-gray-400"
              : "hover:text-[#0077B6]"
          }`}
          onClick={() => item.stok > 0 && addToCart(item)} // Only add to cart if stock > 0
        />
      </div>
      <p className="text-xs text-slate-400">Stok: {item.stok}</p>
    </div>
  </div>
);

export default MenuItem;
