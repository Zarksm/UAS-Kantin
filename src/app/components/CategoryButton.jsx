import React, { useEffect, useState } from "react";
import { menuData } from "@/lib/data"; // Assuming menuData is in the data.js file

const CategoryButton = ({ category, isSelected, onClick, menuCount }) => {
  const Icon = category.icon; // Assuming you have an icon for each category

  return (
    <div
      onClick={onClick}
      className={`max-w-48 min-w-48 h-auto rounded-md p-3 flex items-center gap-3 cursor-pointer snap-start ${
        isSelected ? "bg-[#0077B6] text-white" : "bg-white"
      }`}
    >
      <div className="py-2 px-2 bg-slate-200 rounded-sm flex items-center justify-center">
        <Icon
          className={`text-3xl ${
            isSelected ? "text-[#0077B6]" : "text-slate-300"
          }`}
        />
      </div>
      <div>
        <p className="text-sm">{category.name}</p>
        <p className="text-sm text-slate-400">{menuCount} Menu</p>{" "}
        {/* Display count */}
      </div>
    </div>
  );
};

export default CategoryButton;
