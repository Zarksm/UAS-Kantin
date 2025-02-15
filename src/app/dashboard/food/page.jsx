import { CiCirclePlus } from "react-icons/ci";
import { foods } from "@/lib/data";

// app/dashboard/food/page.js
import React from "react";
import FoodCard from "../../components/FoodCard";

const FoodManagement = () => {
  return (
    <div>
      <div className="flex items-center cursor-pointer gap-2 bg-slate-200 w-max p-2 rounded-lg mb-10 hover:bg-blue-400 hover:text-white transition-colors duration-200">
        <span className="text-2xl">
          <CiCirclePlus />
        </span>
        <h2>Tambah Menu</h2>
      </div>
      <h2 className="text-xl font-bold mb-5">Menu Makanan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodManagement;
