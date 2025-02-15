// app/components/DashboardCard.js
"use client";

import React from "react";

const DashboardCard = ({ title, value }) => {
  return (
    <div>
      <div className="rounded-lg p-4 mb-4 bg-white flex flex-col gap-3">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-2xl font-light">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
