"use client";
import React, { useState } from "react";

const TabSettings = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("General");

  const menu = [
    { name: "General" },
    { name: "Notification" },
    { name: "Security" },
    { name: "Billing" },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName); // Notify the parent of the tab change
  };

  return (
    <div className="mb-6 w-full bg-white rounded-full overflow-hidden p-1">
      <div className="w-full">
        <ul className="flex gap-2 justify-around">
          {menu.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 p-2 rounded-full w-full cursor-pointer justify-center transition-all duration-300 ease-in-out ${
                activeTab === item.name ? "bg-slate-200" : "bg-white"
              }`}
              onClick={() => handleTabClick(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabSettings;
