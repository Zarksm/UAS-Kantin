// components/CategoryButton.js
import React from "react";

const CategoryButton = ({ category, isSelected, onClick }) => {
  const Icon = category.icon;

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
        <p className="text-sm text-slate-400">{category.menuCount} Menu</p>
      </div>
    </div>
  );
};

export default CategoryButton;
