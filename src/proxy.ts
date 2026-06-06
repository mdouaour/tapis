import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

const securityHeaders = {
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "x-xss-protection": "1; mode=block",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    Object.entries(securityHeaders).forEach(([key, value]) =>
      response.headers.set(key, value),
    );
    return response;
  }

  const response = handleI18n(request);

  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}`)) ||
    routing.defaultLocale;

  response.headers.set("x-direction", locale === "ar" ? "rtl" : "ltr");
  response.headers.set(
    "strict-transport-security",
    "max-age=31536000; includeSubDomains",
  );
  Object.entries(securityHeaders).forEach(([key, value]) =>
    response.headers.set(key, value),
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
