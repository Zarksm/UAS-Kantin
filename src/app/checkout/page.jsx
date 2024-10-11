"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the cart data from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Group items by name and count the quantity
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const totalPrice = groupedCart.length
    ? groupedCart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    : 0;

  const handleCheckout = () => {
    // Logic to handle the checkout process (e.g., sending the order to the backend)
    alert("Checkout process initiated");
  };

  const handleBackToHome = () => {
    // Navigate back to home page
    router.push("/");
  };

  return (
    <div className="px-5 md:px-96 py-10 bg-gray-100 min-h-screen font-poppins">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Checkout</h1>
      <div className="bg-white shadow-md rounded-lg p-5">
        {groupedCart.length > 0 ? (
          groupedCart.map((item, index) => {
            const totalItemPrice = item.price * item.quantity;
            return (
              <div
                key={index}
                className="mb-3 flex justify-between items-center pb-3"
              >
                <div className="flex gap-5 items-center">
                  <p className="text-gray-700 font-medium">
                    {item.name} {item.quantity > 1 ? `x${item.quantity}` : ""}
                  </p>
                  <p className="text-xs italic text-slate-500">
                    ({`Rp ${item.price.toLocaleString()}`})
                  </p>
                </div>
                <p className="text-gray-700 font-normal">
                  {item.quantity >= 1 && (
                    <span className="text-black">
                      Rp {totalItemPrice.toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
        <div className="mt-5 flex justify-between items-center font-normal text-gray-800 text-lg border-t pt-3">
          <p>Total Price</p>
          <p>Rp {totalPrice.toLocaleString()}</p>
        </div>
        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <button
            onClick={handleCheckout}
            className="w-full bg-[#0077B6] hover:bg-[#005f99] text-white p-2 rounded-md font-bold text-lg"
          >
            Proceed to Payment
          </button>
          <button
            onClick={handleBackToHome}
            className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-700 p-2 rounded-md font-bold text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
