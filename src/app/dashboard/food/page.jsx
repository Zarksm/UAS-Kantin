"use client";

import React, { useEffect, useState } from "react";
import FoodCard from "../../components/FoodCard";
import { CiCirclePlus } from "react-icons/ci";

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "makanan", // Default category value
  });

  // Fetching the foods from the API
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/foods");
      const data = await res.json();
      console.log("Data dari API:", data);
      setFoods(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to add a new food item
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchFoods(); // Re-fetch the foods list after adding a new one
        setIsModalOpen(false); // Close the modal
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "makanan", // Reset category to default value
        });
      } else {
        alert("Failed to add food");
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <div
        onClick={() => setIsModalOpen(true)} // Open modal on click
        className="flex items-center cursor-pointer gap-2 bg-slate-200 w-max p-2 rounded-lg mb-10 hover:bg-blue-400 hover:text-white transition-colors duration-200"
      >
        <span className="text-2xl">
          <CiCirclePlus />
        </span>
        <h2>Tambah Menu</h2>
      </div>

      <h2 className="text-xl font-bold mb-5">Menu Makanan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : foods.length === 0 ? (
          <p>Data kosong...</p>
        ) : (
          foods.map((food) => (
            <FoodCard key={food.id} food={food} onDelete={fetchFoods} />
          ))
        )}
      </div>

      {/* Modal Form to add food */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white p-8 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h3 className="text-xl font-bold mb-4">Tambah Menu</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                  <option value="jajanan">Jajanan</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                Add Food
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodManagement;
