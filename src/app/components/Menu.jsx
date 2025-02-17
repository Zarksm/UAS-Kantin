// "use client";
// import React, { useState, useEffect } from "react";
// import CategoryButton from "./CategoryButton";
// import MenuItem from "./MenuItem";
// import Cart from "./Cart"; // Import the Cart component
// import { menuData, menuItems } from "../../lib/data";

// const Menu = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [cart, setCart] = useState([]); // Initialize cart as an empty array
//   const [categoryCounts, setCategoryCounts] = useState([]); // Store category counts

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // Fetch category counts
//   useEffect(() => {
//     const fetchCategoryCounts = async () => {
//       try {
//         const response = await fetch("/api/foods/categories");
//         const categories = await response.json();

//         // Set category counts (normalize case for matching)
//         setCategoryCounts(categories);
//         console.log(categories);
//       } catch (error) {
//         console.error("Error fetching category counts:", error);
//       }
//     };
//     fetchCategoryCounts();
//   }, []);

//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const updatedCart = [...prevCart, item];
//       localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
//       return updatedCart;
//     });
//   };

//   return (
//     <div>
//       {/* Category selection */}
//       <div className="mt-5 flex md:flex-wrap gap-3 overflow-x-auto snap-x snap-mandatory">
//         {menuData.categories.map((category) => {
//           // Find the matching count for each category
//           const categoryCount = categoryCounts.find(
//             (count) =>
//               count.category.toLowerCase() === category.name.toLowerCase()
//           )?.menucount; // Use `.menucount` from API data

//           return (
//             <CategoryButton
//               key={category.id}
//               category={category}
//               isSelected={selectedCategory === category.id}
//               onClick={() => setSelectedCategory(category.id)}
//               menuCount={categoryCount || 0} // Default to 0 if not found
//             />
//           );
//         })}
//       </div>
//       {/* Display selected category and menu items */}
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold">
//           {selectedCategory
//             ? selectedCategory.charAt(0).toUpperCase() +
//               selectedCategory.slice(1)
//             : ""}
//         </h2>
//         <div className="mt-4 md:flex gap-3 w-full flex-wrap">
//           {selectedCategory ? (
//             menuItems[selectedCategory]?.map((item, index) => (
//               <MenuItem key={index} item={item} addToCart={addToCart} /> // Pass addToCart to MenuItem
//             ))
//           ) : (
//             <p>Pilih kategori untuk melihat menu. tesss</p>
//           )}
//         </div>
//       </div>
//       {/* Conditionally render Cart if there are items */}
//       <div>{cart && cart.length > 0 && <Cart cart={cart} />} </div>
//       {/* Show Cart if cart has items */}
//     </div>
//   );
// };

// export default Menu;

"use client";
import React, { useState, useEffect } from "react";
import CategoryButton from "./CategoryButton";
import MenuItem from "./MenuItem";
import Cart from "./Cart"; // Import the Cart component

import { menuData, menuItems } from "../../lib/data";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]); // Store menu items for the selected category
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const [categoryCounts, setCategoryCounts] = useState([]); // Store category counts

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Fetch category counts
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch("/api/foods/categories");
        const categories = await response.json();

        setCategoryCounts(categories);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };
    fetchCategoryCounts();
  }, []);

  // Fetch menu items based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const fetchMenuItems = async () => {
        try {
          const response = await fetch(`/api/menu/${selectedCategory}`);
          const data = await response.json();

          if (response.ok) {
            setMenuItems(data);
          } else {
            console.error("No menu items found for this category.");
            setMenuItems([]);
          }
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      };
      fetchMenuItems();
    }
  }, [selectedCategory]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
  };

  return (
    <div>
      {/* Category selection */}
      <div className="mt-5 flex md:flex-wrap gap-3 overflow-x-auto snap-x snap-mandatory">
        {menuData.categories.map((category) => {
          const categoryCount = categoryCounts.find(
            (count) =>
              count.category.toLowerCase() === category.name.toLowerCase()
          )?.menucount;
          return (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.name}
              onClick={() => setSelectedCategory(category.name)}
              menuCount={categoryCount || 0} // Default to 0 if not found
            />
          );
        })}
      </div>

      {/* Display selected category and menu items */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          {" "}
          {selectedCategory
            ? selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            : ""}
        </h2>
        <div className="mt-4 md:flex gap-3 w-full flex-wrap">
          {selectedCategory ? (
            menuItems.length > 0 ? (
              menuItems.map((item, index) => (
                <MenuItem key={index} item={item} addToCart={addToCart} />
              ))
            ) : (
              <p>No items found in this category.</p>
            )
          ) : (
            <p>Select a category to view the menu.</p>
          )}
        </div>
      </div>

      {/* Conditionally render Cart if there are items */}
      <div>{cart.length > 0 && <Cart cart={cart} />} </div>
    </div>
  );
};

export default Menu;
