import React from "react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { supabase } from "@/lib/db";
import { useRouter } from "next/navigation";

const FoodCard = ({ food, onDelete }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus ${food.name}?`
    );

    if (!confirmDelete) return;
    const handleDelete = async () => {
      const confirmDelete = window.confirm(
        `Apakah Anda yakin ingin menghapus ${food.name}?`
      );

      if (!confirmDelete) return;

      const { error } = await supabase.from("foods").delete().eq("id", food.id);

      if (error) {
        console.error("Failed to delete food:", error);
      } else {
        alert("Food deleted successfully!");
        onDelete(); // 🔄 Panggil fungsi fetch ulang di parent component
        router.refresh(); // 🔄 Pastikan halaman refresh otomatis
      }
    };
    const { error } = await supabase.from("foods").delete().eq("id", food.id);

    if (error) {
      console.error("Failed to delete food:", error);
    } else {
      alert("Food deleted successfully!");
      onDelete(); // 🔄 Panggil fungsi fetch ulang di parent component
      router.refresh(); // 🔄 Pastikan halaman refresh otomatis
    }
  };

  return (
    <div className="bg-white rounded-md p-4 flex flex-col gap-1 shadow-md">
      <div>
        <h3 className="font-bold text-xl">{food.name}</h3>
        <></>
      </div>
      <div>
        <p className="text-slate-400">{food.description}</p>
        <p className="text-gray-700">Rp {food.price.toLocaleString()}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-slate-400">Stock: {food.stock}</p>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/food/detail/${food.id}`}
            className="bg-blue-400 text-white px-3 py-2 rounded-md text-xl"
          >
            <CiEdit />
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-400 text-white px-3 py-2 rounded-md text-xl"
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
