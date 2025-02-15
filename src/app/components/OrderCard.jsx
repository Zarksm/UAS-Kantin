// app/components/OrderCard.js
import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-md p-4">
      <h3 className="font-bold text-lg">{order.food}</h3>
      <p>Customer: {order.customer}</p>
      <p>Status: {order.status}</p>
    </div>
  );
};

export default OrderCard;
