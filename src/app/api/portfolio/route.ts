import { NextResponse } from "next/server";
import { isValidAdminCookie, COOKIE_NAME } from "@/lib/auth";
import type { PortfolioData } from "@/lib/portfolio";
import { loadPortfolio, savePortfolio } from "@/lib/storage";
import { cookies } from "next/headers";

export async function GET() {
  const portfolio = await loadPortfolio();
  return NextResponse.json(portfolio);
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!isValidAdminCookie(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as PortfolioData;
    const saved = await savePortfolio(body);
    return NextResponse.json(saved);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
