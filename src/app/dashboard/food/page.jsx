// app/dashboard/food/page.js
import React from "react";
import FoodCard from "../../components/FoodCard";

const FoodManagement = () => {
  const foods = [
    { id: 1, name: "Pizza", price: 100, description: "Delicious cheese pizza" },
    { id: 2, name: "Burger", price: 80, description: "Juicy beef burger" },
    // Add more food items here
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Manage Food Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodManagement;
