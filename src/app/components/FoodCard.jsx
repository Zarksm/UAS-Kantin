import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

// app/components/FoodCard.js
import React from "react";
import Link from "next/link";

const FoodCard = ({ food }) => {
  return (
    <div className="bg-white rounded-md p-4 flex flex-col gap-2">
      <h3 className="font-bold text-xl">{food.name}</h3>
      <div>
        <p>{food.description}</p>
        <p className="text-gray-700">Rp {food.price.toLocaleString()}</p>
      </div>
      <div className="flex gap-2 w-full justify-between items-center">
        <div>
          <p className="text-slate-400">Stock: {food.stok}</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href={`/dashboard/food/detail/${food.id}`}
            className="mt-5 bg-blue-400 text-white px-3 py-2 rounded-md text-xl"
          >
            <CiEdit />
          </Link>
          <Link
            href={`/dashboard/food/delete/${food.id}`}
            className="mt-5 bg-red-400 text-white px-3 py-2 rounded-md text-xl"
          >
            <MdOutlineDelete />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
