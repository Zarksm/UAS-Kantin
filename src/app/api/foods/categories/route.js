import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 Fetching categories from Supabase...");

    // Corrected Supabase query: Using raw SQL
    const { data, error } = await supabase.rpc("get_category_counts");

    if (error) {
      console.error("❌ Supabase Query Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Supabase Response:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
