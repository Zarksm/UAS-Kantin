"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderCode, setOrderCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalPrice = groupedCart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleOrderMore = () => {
    router.push("/");
  };

  const handleProceedToPayment = () => {
    setCheckoutStep(2);
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const generatedOrderCode = `ORD-${Math.floor(Math.random() * 10000)}`;
    setOrderCode(generatedOrderCode);
    setCheckoutStep(3);
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="px-5 md:px-96 py-10 bg-gray-100 min-h-screen font-poppins">
      {checkoutStep === 1 && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Checkout</h1>
          <div className="bg-white rounded-md p-5">
            {groupedCart.length > 0 ? (
              groupedCart.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 flex justify-between items-center pb-3"
                >
                  <p className="text-gray-700 font-medium">
                    {item.name} x{item.quantity}
                  </p>
                  <p className="text-gray-700">
                    Rp {item.price * item.quantity}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty</p>
            )}
            <div className="mt-5 flex justify-between items-center font-normal text-gray-800 text-lg border-t pt-3">
              <p>Total Price</p>
              <p>Rp {totalPrice.toLocaleString()}</p>
            </div>
            <button
              onClick={handleOrderMore}
              className="mt-3 bg-green-500 text-white p-2 rounded-md"
            >
              Order More
            </button>
          </div>
        </>
      )}

      {checkoutStep === 2 && (
        <div className="bg-white rounded-md p-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Payment</h1>
          <p>
            Total Price: <strong>Rp {totalPrice.toLocaleString()}</strong>
          </p>
          <p>Choose a payment method:</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handlePaymentSelection("cash")}
              className={`p-2 border rounded-md ${
                paymentMethod === "cash" ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              Pay at Place
            </button>
            <button
              onClick={() => handlePaymentSelection("online")}
              className={`p-2 border rounded-md ${
                paymentMethod === "online"
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              Pay Online
            </button>
          </div>
          <div className="mt-5">
            <label className="block text-gray-700">Name (optional):</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div className="mt-3">
            <label className="block text-gray-700">
              Phone Number (optional):
            </label>
            <input
              type="text"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      )}

      {checkoutStep === 3 && (
        <div className="bg-white rounded-md p-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">
            Order Confirmed
          </h1>
          <p>Your order has been confirmed!</p>
          <p className="mt-2">
            Your order code is:{" "}
            <strong className="text-blue-600">{orderCode}</strong>
          </p>
          {clientName && (
            <p className="mt-2">
              Name: <strong>{clientName}</strong>
            </p>
          )}
          {clientPhone && (
            <p className="mt-2">
              Phone: <strong>{clientPhone}</strong>
            </p>
          )}
        </div>
      )}

      <div className="mt-5 flex justify-between">
        {checkoutStep > 1 && checkoutStep < 3 && (
          <button
            onClick={() => setCheckoutStep(1)}
            className="bg-gray-300 text-gray-700 p-2 rounded-md"
          >
            Back
          </button>
        )}
        {checkoutStep === 1 && (
          <button
            onClick={handleProceedToPayment}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Proceed to Payment
          </button>
        )}
        {checkoutStep === 2 && (
          <button
            onClick={handleConfirmPayment}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Confirm Payment
          </button>
        )}
        {checkoutStep === 3 && (
          <button
            onClick={handleBackToHome}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
