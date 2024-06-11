import type { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

export async function middleware(request: NextRequest) {
  const ip = request.ip;
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip)
  );

  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const isNew = await kv.set(["deduplicate", hash].join(":"), true, {
    nx: true,
    ex: 60 * 60, // 1 hour expiry
  });

  if (isNew === "OK") {
    await kv.incr("siteviews");
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
