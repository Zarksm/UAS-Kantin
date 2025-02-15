// "use client";

// import React from "react";
// import { LuArrowRight } from "react-icons/lu";
// import { useRouter } from "next/navigation";

// const Cart = ({ cart = [] }) => {
//   const router = useRouter();

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * (item.quantity || 1),
//     0
//   );

//   const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

//   return (
//     <div className="w-full p-3 bg-[#0077B6] rounded-md text-white flex justify-between items-center absolute bottom-10">
//       <p>{totalItems} di Keranjang</p>

//       <div className="flex gap-4 items-center">
//         <p>Rp. {totalPrice.toLocaleString()}</p>
//         <div
//           className="p-2 bg-white rounded-md cursor-pointer"
//           onClick={() => router.push("/checkout")}
//         >
//           <LuArrowRight className="text-black" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

"use client";

import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Cart = ({ cart = [] }) => {
  const router = useRouter();

  // Pastikan quantity ada dalam setiap item
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="w-full p-3 bg-[#0077B6] rounded-md text-white flex justify-between items-center absolute bottom-10">
      <p>{totalItems} di Keranjang</p>

      <div className="flex gap-4 items-center">
        <p>Rp. {totalPrice.toLocaleString()}</p>
        <div
          className="p-2 bg-white rounded-md cursor-pointer"
          onClick={() => router.push("/checkout")}
        >
          <LuArrowRight className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
