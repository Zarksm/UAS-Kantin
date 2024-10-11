// app/dashboard/orders/layout.js
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const OrdersLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default OrdersLayout;
