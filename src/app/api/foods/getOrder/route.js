import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET() {
  try {
    const { data, error } = await supabase.from("orders").select("*");

    if (error) throw error;

    return NextResponse.json({ success: true, orders: data }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil orders:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
