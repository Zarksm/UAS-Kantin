// app/dashboard/food/layout.js
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const FoodLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <main className="p-2 bg-slate-100">{children}</main>
      </div>
    </div>
  );
};

export default FoodLayout;
