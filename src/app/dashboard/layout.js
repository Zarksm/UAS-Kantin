// app/dashboard/layout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <main className="p-6 bg-slate-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
