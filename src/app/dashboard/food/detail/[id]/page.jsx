"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/db";
import Link from "next/link";
import Form from "@/app/components/Form";

const DetailFood = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFood = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching food:", error);
    } else {
      setFood(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchFood();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!food) return <p>Food not found</p>;

  const handleFormSubmit = async (updatedFood) => {
    const { error } = await supabase
      .from("foods")
      .update(updatedFood)
      .eq("id", id);

    if (error) {
      console.error("Failed to update food:", error);
      alert("Error while updating food. Please try again.");
    } else {
      alert("Food updated successfully!");
      fetchFood(); // Fetch updated food data
      router.push("/dashboard/food"); // Redirect after update
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
      <Link
        href="/dashboard/food"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Menu
      </Link>
      <Form food={food} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default DetailFood;
