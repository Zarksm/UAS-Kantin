// app/components/Sidebar.js
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 p-5 h-screen">
      <h2 className="text-2xl font-bold mb-5">CMS Dashboard</h2>
      <ul>
        <li>
          <Link href="/dashboard" className="block py-2 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/food" className="block py-2 hover:bg-gray-700">
            Manage Food
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/orders"
            className="block py-2 hover:bg-gray-700"
          >
            Manage Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
