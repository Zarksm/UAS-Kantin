// app/components/FoodCard.js
import React from "react";

const FoodCard = ({ food }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="font-bold text-lg">{food.name}</h3>
      <p>{food.description}</p>
      <p className="text-gray-700">Rp {food.price.toLocaleString()}</p>
      <button className="mt-2 bg-[#0077B6] text-white p-2 rounded-md">
        Edit
      </button>
    </div>
  );
};

export default FoodCard;
