import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth.ts";

export async function GET(request: NextRequest) {
  await auth.signOut();

  // Redirect to auth page
  return NextResponse.redirect(new URL("/auth", request.url));
}
