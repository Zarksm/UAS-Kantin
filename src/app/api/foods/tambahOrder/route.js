import { NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, cart, paymentMethod } = body;

    if (!customerName || !cart || cart.length === 0 || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Data tidak lengkap" }, { status: 400 });
    }

    const orderCode = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { data, error } = await supabase.from("orders").insert([
      {
        id: uuidv4(),
        order_code: orderCode,
        customer_name: customerName,
        customer_phone: customerPhone || null,
        menu: cart,
        total_price: totalPrice,
        payment_method: paymentMethod,
      },
    ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, orderCode }, { status: 201 });
  } catch (error) {
    console.error("Gagal menyimpan order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
