import React, { useState } from "react";

const Form = ({ food, onSubmit }) => {
  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(food.price);
  const [description, setDescription] = useState(food.description);
  const [stok, setStok] = useState(food.stok);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated data back to the parent component or handle update logic here
    onSubmit({ ...food, name, price, description, stok });
  };

  return (
    <div className="p-6 bg-white rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Food Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded resize-none"
            rows="3"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="stok" className="font-semibold">
            Stock
          </label>
          <input
            type="number"
            id="stok"
            value={stok}
            onChange={(e) => setStok(parseInt(e.target.value, 10))}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Form;
