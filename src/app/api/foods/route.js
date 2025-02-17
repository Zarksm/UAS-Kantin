import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
// Handle GET request to fetch all foods and their categories
export async function GET() {
  try {
    console.log("Fetching data from Supabase..."); // Debug log
    const { data, error } = await supabase.from("foods").select("*");

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Data from Supabase:", data); // Debug log
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// Handle POST request to insert a new food item
export async function POST(request) {
  try {
    const { name, description, price, stock, category } = await request.json();
    
    // Insert the new food item into the "foods" table
    const { data, error } = await supabase
      .from("foods")
      .insert([{ name, description, price, stock, category }]);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Data inserted into Supabase:", data); // Debug log
    return NextResponse.json({ message: "Food item added successfully!", data }, { status: 201 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
