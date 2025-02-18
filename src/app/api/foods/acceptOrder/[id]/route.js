import { supabase } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = params;  

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "Order ID is required" }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status: "Accepted" })  // Adjust the status field as per your requirement
      .eq("id", id);

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, order: data }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
