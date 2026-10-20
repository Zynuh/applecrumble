import { connection, NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/supabase/database";

export async function GET() {
  await connection();

  try {
    await checkDatabaseConnection();
    return NextResponse.json({ status: "connected" });
  } catch (error) {
    console.error("Supabase database connection check failed.", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed. Check the server logs and Doppler configuration.",
      },
      { status: 503 },
    );
  }
}
