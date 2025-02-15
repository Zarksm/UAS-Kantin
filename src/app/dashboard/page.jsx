// app/dashboard/page.js
import React from "react";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="bg-slate-100">
      <h2 className="text-xl mb-5">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Total Sales" value="Rp 1,000,000" />
        <DashboardCard title="Total Users" value="150" />
        <DashboardCard title="Total Orders" value="75" />
      </div>
      <div className="w-full h-screen bg-white"></div>
    </div>
  );
};

export default Dashboard;
