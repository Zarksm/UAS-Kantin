// app/api/menu/[category]/route.js

import { supabase } from "@/lib/db";  // Assuming you are using Supabase

export async function GET(req, { params }) {
  const { category } = params;  // Access category from route parameters

  try {
    // Query your database to fetch menu items based on the category
    const { data, error } = await supabase
      .from("foods")  // Make sure the table name is 'foods'
      .select("*")
      .eq("category", category);  // Match the category

    if (error) {
      return new Response(
        JSON.stringify({ message: "Error fetching menu items", error }),
        { status: 500 }
      );
    }

    // If no menu items are found, return a 404
    if (data.length === 0) {
      return new Response(
        JSON.stringify({ message: "No menu items found for this category" }),
        { status: 404 }
      );
    }

    // Return the menu items as a JSON response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
