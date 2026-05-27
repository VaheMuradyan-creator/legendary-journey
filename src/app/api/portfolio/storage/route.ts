import { NextResponse } from "next/server";
import { getStorageInfo } from "@/lib/storage";

export async function GET() {
  const info = await getStorageInfo();
  return NextResponse.json(info);
}
