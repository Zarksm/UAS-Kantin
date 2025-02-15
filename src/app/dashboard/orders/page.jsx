// app/dashboard/orders/page.js
import React from "react";
import OrderCard from "../../components/OrderCard";
import { CiSearch, CiViewList } from "react-icons/ci";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilterOutline } from "react-icons/io5";

const OrdersManagement = () => {
  const orders = [
    {
      id: 1,
      food: "Pizza",
      customer: "John Doe",
      status: "Completed",
      time: "12:30 PM",
      date: "2023-08-15",
      items: 2,
      total: 10000,
    },
    {
      id: 2,
      food: "Burger",
      customer: "Jane Doe",
      status: "Pending",
      time: "12:30 PM",
      date: "2023-08-15",
      items: 2,
      total: 25000,
    },
    {
      id: 3,
      food: "Burger",
      customer: "Jane Doe",
      status: "Pending",
      time: "12:30 PM",
      date: "2023-08-15",
      items: 1,
      total: 11000,
    },
    // Add more orders here
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Orders</h2>

      {/* Tab */}
      <div className="flex gap-8 w-full border-b mb-4 relative">
        <div className="cursor-pointer active-tab p-2">
          <p>All</p>
        </div>
        <div className="cursor-pointer p-2">
          <p>Completed</p>
        </div>
        <div className="cursor-pointer p-2">
          <p>Pending</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-3 relative flex justify-between">
        <div className="relative w-max">
          <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search order.."
            className="pl-10 pr-4 py-1 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="h-auto bg-white rounded-lg flex items-center justify-around px-4 gap-5">
            <HiOutlineViewGrid size={24} className="cursor-pointer" />
            <CiViewList size={24} className="cursor-pointer text-red-400" />
          </div>
          <div className="h-auto bg-white rounded-lg flex items-center justify-around px-3 gap-2">
            <IoFilterOutline size={18} className="cursor-pointer" />
            <p>Filter</p>
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="w-full min-h-screen max-h-screen bg-white rounded-lg p-2">
        <div className="w-full h-auto bg-slate-200 rounded-lg flex py-2 px-3">
          <div className="flex-1 grow">
            <p>Order</p>
          </div>
          <div className="flex-1">
            <p>Customer</p>
          </div>
          <div className="flex-1">
            <p>Date</p>
          </div>
          <div className="flex-1">
            <p>Items</p>
          </div>
          <div className="flex-1">
            <p>Total</p>
          </div>
          <div className="flex-1">
            <p>Status</p>
          </div>
        </div>

        {orders.map((order) => (
          <div
            className="w-full h-auto flex py-2 px-3 mt-3 border-b"
            key={order.id}
          >
            <div className="flex-1 grow">
              <p>{order.id}</p>
            </div>
            <div className="flex-1">
              <p>{order.customer}</p>
            </div>
            <div className="flex-1">
              <p>{order.date}</p>
            </div>
            <div className="flex-1">
              <p>{order.items} Items</p>
            </div>
            <div className="flex-1">
              <p>Rp. {order.total.toLocaleString("id-ID")}</p>
            </div>
            <div className="flex-1">
              <p>{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersManagement;
