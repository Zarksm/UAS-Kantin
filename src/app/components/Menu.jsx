// components/Menu.js
"use client";
import React, { useState } from "react";
import CategoryButton from "./CategoryButton";
import MenuItem from "./MenuItem";
import { menuData, menuItems } from "../../lib/data";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        <div className="mt-4 md:flex gap-3">
          {selectedCategory ? (
            menuItems[selectedCategory].map((item, index) => (
              <MenuItem key={index} item={item} />
            ))
          ) : (
            <p>Select a category to view menu items.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
