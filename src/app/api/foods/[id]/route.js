import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// Handle GET request to fetch a specific food item by ID
export async function GET({ params }) {
  const { id } = params; // Get the food ID from the URL

  try {
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .eq("id", id)
      .single(); // Fetch the food item by its ID

    if (error) {
      console.error("Error fetching food:", error);
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle PUT request to update a specific food item by ID
export async function PUT(request, { params }) {
  const { id } = params; // Get the food ID from the URL
  const { name, description, price, stock, category } = await request.json(); // Extract data from request body

  if (!name || !description || !price || !stock || !category) {
    return NextResponse.json({ error: "All fields must be filled." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("foods")
      .update({ name, description, price, stock, category })
      .eq("id", id);

    if (error) {
      console.error("Error during update:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
