// app/dashboard/orders/page.js
import React from "react";
import OrderCard from "../../components/OrderCard";

const OrdersManagement = () => {
  const orders = [
    { id: 1, food: "Pizza", customer: "John Doe", status: "Completed" },
    { id: 2, food: "Burger", customer: "Jane Doe", status: "Pending" },
    // Add more orders here
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Manage Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersManagement;
