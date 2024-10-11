// app/components/OrderCard.js
import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="font-bold text-lg">{order.food}</h3>
      <p>Customer: {order.customer}</p>
      <p>Status: {order.status}</p>
      <button className="mt-2 bg-[#0077B6] text-white p-2 rounded-md">
        View Details
      </button>
    </div>
  );
};

export default OrderCard;
