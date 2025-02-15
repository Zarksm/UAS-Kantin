"use client";
import React, { useState, useEffect } from "react";
import CategoryButton from "./CategoryButton";
import MenuItem from "./MenuItem";
import Cart from "./Cart"; // Import the Cart component
import { menuData, menuItems } from "../../lib/data";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Use sessionStorage instead of localStorage
      return updatedCart;
    });
  };

  // Function to add items to the cart
  // const addToCart = (item) => {
  //   setCart((prevCart) => {
  //     const updatedCart = [...prevCart, item];
  //     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  //     return updatedCart;
  //   });
  // };

  return (
    <div>
      {/* Category selection */}
      <div className="mt-5 flex md:flex-wrap gap-3 overflow-x-auto snap-x snap-mandatory">
        {menuData.categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          />
        ))}
      </div>
      {/* Display selected category and menu items */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          {selectedCategory
            ? selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            : ""}
        </h2>
        <div className="mt-4 md:flex gap-3 w-full flex-wrap">
          {selectedCategory ? (
            menuItems[selectedCategory]?.map((item, index) => (
              <MenuItem key={index} item={item} addToCart={addToCart} /> // Pass addToCart to MenuItem
            ))
          ) : (
            <p>Pilih kategori untuk melihat menu.</p>
          )}
        </div>
      </div>
      {/* Conditionally render Cart if there are items */}
      <div>{cart && cart.length > 0 && <Cart cart={cart} />} </div>
      {/* Show Cart if cart has items */}
    </div>
  );
};

export default Menu;
