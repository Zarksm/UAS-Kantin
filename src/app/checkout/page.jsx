"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderCode, setOrderCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(
      storedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))
    );
  }, []);

  const handleOrderMore = () => {
    router.push("/");
  };

  const handleProceedToPayment = () => {
    setCheckoutStep(2);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    const generatedOrderCode = `ORD-${Math.floor(Math.random() * 10000)}`;
    setOrderCode(generatedOrderCode);
    setCheckoutStep(3);

    // Hapus cart setelah checkout
    localStorage.removeItem("cart");
    setCart([]);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (name) => {
    const updatedCart = cart.map((item) =>
      item.name === name
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (name) => {
    const updatedCart = cart
      .map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  // FIXED: Gunakan set untuk memastikan tidak ada duplikasi
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      acc.push({ ...item, quantity: item.quantity || 1 });
    }
    return acc;
  }, []);

  // FIXED: Pastikan perhitungan total harga sama dengan yang ada di Cart.js
  const totalPrice = groupedCart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="px-5 md:px-96 py-10 bg-gray-100 min-h-screen font-poppins">
      {checkoutStep === 1 && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Checkout</h1>
          <div className="bg-white rounded-md p-5">
            {groupedCart.map((item, index) => (
              <div
                key={index}
                className="w-full mb-3 grid grid-cols-3 items-center bg-white py-2"
              >
                {/* Nama Item */}
                <p className="text-gray-900 text-sm">
                  {item.name}{" "}
                  <span className="text-gray-500 text-sm">
                    x{item.quantity}
                  </span>
                </p>

                {/* Tombol + dan - */}
                <div className="flex items-center gap-2 justify-center border border-gray-300 rounded-md py-1 md:ml-5">
                  <button
                    onClick={() => handleDecreaseQuantity(item.name)}
                    className="px-3 py-1 text-gray-700 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    −
                  </button>
                  <span className="text-gray-900 w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.name)}
                    className="px-3 py-1 text-gray-700 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
                {/* Harga */}
                <p className="text-gray-900 text-right text-sm">
                  Rp {item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="mt-5 flex justify-between items-center text-lg border-t pt-3">
              <p>Total Harga</p>
              <p>Rp {totalPrice.toLocaleString()}</p>
            </div>
            <button
              onClick={handleOrderMore}
              className="mt-3 bg-green-500 text-white p-2 rounded-md"
            >
              Tambah pesanan?
            </button>
          </div>
        </>
      )}

      {checkoutStep === 2 && (
        <div className="bg-white rounded-md p-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Pembayaran</h1>
          <p>
            Total Harga: <strong>Rp {totalPrice.toLocaleString()}</strong>
          </p>

          {/* Input Nama (Wajib) */}
          <div className="mt-3">
            <label className="block text-gray-700 font-medium">
              Nama (Wajib):
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border rounded-md mt-1"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>

          {/* Input No. Telepon (Opsional) */}
          <div className="mt-3">
            <label className="block text-gray-700 font-medium">
              No. Telepon (Opsional):
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full p-2 border rounded-md mt-1"
              placeholder="Masukkan no. telepon (jika ada)"
            />
          </div>

          {/* Pilihan Metode Pembayaran */}
          <p className="mt-3">Pilih metode pembayaran:</p>
          <div className="flex gap-2 mt-2">
            {[
              { method: "cash", label: "Bayar di Tempat" },
              { method: "online", label: "Bayar Online" },
            ].map(({ method, label }) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`p-2 border rounded-md ${
                  paymentMethod === method
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Pilihan Pembayaran Online */}
          {paymentMethod === "online" && (
            <div className="mt-3">
              <p>Pilih metode pembayaran online:</p>
              <div className="flex gap-2 mt-2">
                {["OVO", "DANA", "BCA"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedOnlinePayment(method)}
                    className={`p-2 border rounded-md ${
                      selectedOnlinePayment === method
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {checkoutStep === 3 && (
        <div className="bg-white rounded-md p-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">
            Pesanan Dikonfirmasi
          </h1>
          <p>
            Kode pesanan Anda:{" "}
            <strong className="text-blue-600">{orderCode}</strong>
          </p>
          <p>
            Nama Pembeli: <strong>{customerName}</strong>
          </p>

          {/* Menampilkan QR Code jika metode online */}
          {paymentMethod === "online" && selectedOnlinePayment && (
            <div className="mt-5 text-center">
              <p className="mb-2">
                Silakan scan QR untuk pembayaran via {selectedOnlinePayment}:
              </p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PAY-${selectedOnlinePayment}-${orderCode}`}
                alt="QR Code Pembayaran"
                className="mx-auto"
              />
              <div>
                <Link href={"/"}>kembali ke menu</Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigasi Langkah Checkout */}
      <div className="mt-5 flex justify-end">
        {checkoutStep === 1 && (
          <button
            onClick={handleProceedToPayment}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Lanjut ke Pembayaran
          </button>
        )}
        {checkoutStep === 2 && (
          <button
            onClick={handleConfirmPayment}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Konfirmasi Pembayaran
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { supabase } from "@/lib/supabase";

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [checkoutStep, setCheckoutStep] = useState(1);
//   const [orderCode, setOrderCode] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [selectedOnlinePayment, setSelectedOnlinePayment] = useState("");

//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(
//       storedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))
//     );
//   }, []);

//   const handleOrderMore = () => {
//     router.push("/");
//   };

//   const handleProceedToPayment = () => {
//     setCheckoutStep(2);
//   };

//   const handleConfirmPayment = async () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method");
//       return;
//     }

//     const generatedOrderCode = `ORD-${Math.floor(Math.random() * 10000)}`;
//     setOrderCode(generatedOrderCode);
//     setCheckoutStep(3);

//     // Hapus cart setelah checkout
//     localStorage.removeItem("cart");
//     setCart([]);

//     // Simpan data ke Supabase
//     const { error } = await supabase.from("orders").insert([
//       {
//         order_code: generatedOrderCode,
//         customer_name: customerName,
//         customer_phone: customerPhone || null,
//         payment_method: paymentMethod,
//         total_price: totalPrice,
//       },
//     ]);

//     if (error) {
//       console.error("Error saving order:", error);
//       alert("Gagal menyimpan pesanan");
//     } else {
//       alert("Pesanan berhasil disimpan!");
//     }
//   };

//   const updateCart = (updatedCart) => {
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleIncreaseQuantity = (name) => {
//     const updatedCart = cart.map((item) =>
//       item.name === name
//         ? { ...item, quantity: (item.quantity || 1) + 1 }
//         : item
//     );
//     updateCart(updatedCart);
//   };

//   const handleDecreaseQuantity = (name) => {
//     const updatedCart = cart
//       .map((item) =>
//         item.name === name ? { ...item, quantity: item.quantity - 1 } : item
//       )
//       .filter((item) => item.quantity > 0);
//     updateCart(updatedCart);
//   };

//   // FIXED: Gunakan set untuk memastikan tidak ada duplikasi
//   const groupedCart = cart.reduce((acc, item) => {
//     const existingItem = acc.find((i) => i.name === item.name);
//     if (existingItem) {
//       existingItem.quantity += item.quantity || 1;
//     } else {
//       acc.push({ ...item, quantity: item.quantity || 1 });
//     }
//     return acc;
//   }, []);

//   // FIXED: Pastikan perhitungan total harga sama dengan yang ada di Cart.js
//   const totalPrice = groupedCart.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//     0
//   );

//   return (
//     <div className="px-5 md:px-96 py-10 bg-gray-100 min-h-screen font-poppins">
//       {checkoutStep === 1 && (
//         <>
//           <h1 className="text-2xl font-bold text-gray-800 mb-5">Checkout</h1>
//           <div className="bg-white rounded-md p-5">
//             {groupedCart.map((item, index) => (
//               <div
//                 key={index}
//                 className="w-full mb-3 grid grid-cols-3 items-center bg-white py-2"
//               >
//                 {/* Nama Item */}
//                 <p className="text-gray-900 text-sm">
//                   {item.name}{" "}
//                   <span className="text-gray-500 text-sm">
//                     x{item.quantity}
//                   </span>
//                 </p>

//                 {/* Tombol + dan - */}
//                 <div className="flex items-center gap-2 justify-center border border-gray-300 rounded-md py-1 md:ml-5">
//                   <button
//                     onClick={() => handleDecreaseQuantity(item.name)}
//                     className="px-3 py-1 text-gray-700 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//                   >
//                     −
//                   </button>
//                   <span className="text-gray-900 w-6 text-center">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => handleIncreaseQuantity(item.name)}
//                     className="px-3 py-1 text-gray-700 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//                 {/* Harga */}
//                 <p className="text-gray-900 text-right text-sm">
//                   Rp {item.price * item.quantity}
//                 </p>
//               </div>
//             ))}

//             <div className="mt-5 flex justify-between items-center text-lg border-t pt-3">
//               <p>Total Harga</p>
//               <p>Rp {totalPrice.toLocaleString()}</p>
//             </div>
//             <button
//               onClick={handleOrderMore}
//               className="mt-3 bg-green-500 text-white p-2 rounded-md"
//             >
//               Tambah pesanan?
//             </button>
//           </div>
//         </>
//       )}

//       {checkoutStep === 2 && (
//         <div className="bg-white rounded-md p-5">
//           <h1 className="text-2xl font-bold text-gray-800 mb-5">Pembayaran</h1>
//           <p>
//             Total Harga: <strong>Rp {totalPrice.toLocaleString()}</strong>
//           </p>

//           {/* Input Nama (Wajib) */}
//           <div className="mt-3">
//             <label className="block text-gray-700 font-medium">
//               Nama (Wajib):
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               className="w-full p-2 border rounded-md mt-1"
//               placeholder="Masukkan nama Anda"
//               required
//             />
//           </div>

//           {/* Input No. Telepon (Opsional) */}
//           <div className="mt-3">
//             <label className="block text-gray-700 font-medium">
//               No. Telepon (Opsional):
//             </label>
//             <input
//               type="text"
//               value={customerPhone}
//               onChange={(e) => setCustomerPhone(e.target.value)}
//               className="w-full p-2 border rounded-md mt-1"
//               placeholder="Masukkan no. telepon (jika ada)"
//             />
//           </div>

//           {/* Pilihan Metode Pembayaran */}
//           <p className="mt-3">Pilih metode pembayaran:</p>
//           <div className="flex gap-2 mt-2">
//             {[
//               { method: "cash", label: "Bayar di Tempat" },
//               { method: "online", label: "Bayar Online" },
//             ].map(({ method, label }) => (
//               <button
//                 key={method}
//                 onClick={() => setPaymentMethod(method)}
//                 className={`p-2 border rounded-md ${
//                   paymentMethod === method
//                     ? "bg-blue-500 text-white"
//                     : "bg-white"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Pilihan Pembayaran Online */}
//           {paymentMethod === "online" && (
//             <div className="mt-3">
//               <p>Pilih metode pembayaran online:</p>
//               <div className="flex gap-2 mt-2">
//                 {["OVO", "DANA", "BCA"].map((method) => (
//                   <button
//                     key={method}
//                     onClick={() => setSelectedOnlinePayment(method)}
//                     className={`p-2 border rounded-md ${
//                       selectedOnlinePayment === method
//                         ? "bg-blue-500 text-white"
//                         : "bg-white"
//                     }`}
//                   >
//                     {method}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {checkoutStep === 3 && (
//         <div className="bg-white rounded-md p-5">
//           <h1 className="text-2xl font-bold text-gray-800 mb-5">
//             Pesanan Dikonfirmasi
//           </h1>
//           <p>
//             Kode pesanan Anda:{" "}
//             <strong className="text-blue-600">{orderCode}</strong>
//           </p>
//           <p>
//             Nama Pembeli: <strong>{customerName}</strong>
//           </p>

//           {/* Menampilkan QR Code jika metode online */}
//           {paymentMethod === "online" && selectedOnlinePayment && (
//             <div className="mt-5 text-center">
//               <p className="mb-2">
//                 Silakan scan QR untuk pembayaran via {selectedOnlinePayment}:
//               </p>
//               <img
//                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PAY-${selectedOnlinePayment}-${orderCode}`}
//                 alt="QR Code Pembayaran"
//                 className="mx-auto"
//               />
//               <div>
//                 <Link href={"/"}>kembali ke menu</Link>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Navigasi Langkah Checkout */}
//       <div className="mt-5 flex justify-end">
//         {checkoutStep === 1 && (
//           <button
//             onClick={handleProceedToPayment}
//             className="bg-blue-600 text-white p-2 rounded-md"
//           >
//             Lanjut ke Pembayaran
//           </button>
//         )}
//         {checkoutStep === 2 && (
//           <button
//             onClick={handleConfirmPayment}
//             className="bg-blue-600 text-white p-2 rounded-md"
//           >
//             Konfirmasi Pembayaran
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;
