"use client";
import React, { useEffect, useState } from "react";
import { CiSearch, CiViewList } from "react-icons/ci";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const acceptOrder = async (id) => {
    try {
      // Send PUT request to the API endpoint with the order id
      const response = await fetch(`/api/foods/acceptOrder/${id}`, {
        method: "PUT", // Ensure the HTTP method is PUT
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is ok (status 200)
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Parse the response as JSON
      const data = await response.json();

      // If the response was successful
      if (data.success) {
        // Handle success (e.g., refresh the UI)
        console.log("Order accepted:", data);
        window.location.reload(); // Reload the page to reflect changes
      } else {
        console.error("Error accepting order:", data.error);
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/foods/getOrder");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

          <div className="flex-1">
            <p>Action</p>
          </div>
        </div>

        {loading ? (
          <p className="text-center mt-5">Loading orders...</p>
        ) : (
          orders.map((order) => (
            <div
              className="w-full h-auto flex py-2 px-3 mt-3 border-b"
              key={order.id}
            >
              <div className="flex-1 grow">
                <p>{order.order_code}</p>
              </div>
              <div className="flex-1">
                <p>{order.customer_name}</p>
              </div>
              <div className="flex-1">
                <p>{order.created_at?.split("T")[0]}</p>
              </div>
              <div className="flex-1">
                <p>{order.menu.length} Items</p>
              </div>
              <div className="flex-1">
                <p>Rp. {order.total_price.toLocaleString("id-ID")}</p>
              </div>
              <div className="flex-1">
                <p>{order.status}</p>
              </div>
              <div
                className={`flex-1 ${
                  order.status === "Pending"
                    ? "cursor-pointer"
                    : "cursor-not-allowed text-slate-400"
                }`}
              >
                <IoIosCheckmarkCircleOutline
                  onClick={() =>
                    order.status === "Pending" && acceptOrder(order.id)
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;
