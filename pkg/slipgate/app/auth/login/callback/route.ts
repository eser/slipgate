import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth.ts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  await auth.signInCallback(code);

  // Redirect to home page
  return NextResponse.redirect(new URL("/", request.url));
}
