"use client";
// app/dashboard/food/detail/[id]/page.js
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { foods } from "@/lib/data";
import Link from "next/link";
import Form from "@/app/components/Form";

const DetailFood = () => {
  const params = useParams();
  const { id } = params;

  // Find the food item by id
  const foodItem = foods.find((item) => item.id === parseInt(id, 10));
  const [food, setFood] = useState(foodItem);

  if (!food) {
    return <div>Food item not found</div>;
  }

  // Handle form submission to update food details
  const handleFormSubmit = (updatedFood) => {
    // Update local state with the updated food details
    setFood(updatedFood);

    // You can add logic here to update the food item in your data source
    console.log("Updated food details:", updatedFood);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <Link
        href="/dashboard/food"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Menu
      </Link>

      {/* Render the Form component and pass food data */}
      <Form food={food} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default DetailFood;
