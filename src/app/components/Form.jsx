"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Form = ({ food, onSubmit }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: food.name || "",
    description: food.description || "",
    price: food.price || "",
    stock: food.stock || "",
    category: food.category || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/foods/${food.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseText = await res.text();
      console.log(responseText); // Log response for debugging

      if (res.ok) {
        try {
          const data = JSON.parse(responseText); // Only parse if OK
          onSubmit(data);
          router.push("/dashboard/food"); // Redirect after update
        } catch (error) {
          console.error("Failed to parse response:", error);
          alert("Error while updating food.");
        }
      } else {
        try {
          const errorData = JSON.parse(responseText);
          alert(`Failed to update food: ${errorData.error || "Unknown error"}`);
        } catch (error) {
          console.error("Error parsing error response:", error);
          alert("Unexpected error occurred.");
        }
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("There was an error while updating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Food Name"
        className="border p-2 rounded-md"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 rounded-md"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 rounded-md"
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border p-2 rounded-md"
      />
      {/* Dropdown for category selection */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option value="">Select Category</option>
        <option value="makanan">Makanan</option>
        <option value="minuman">Minuman</option>
        <option value="jajanan">Jajanan</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default Form;
