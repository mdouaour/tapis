import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = handleI18n(request);

  const locale =
    routing.locales.find((l) => pathname.startsWith(`/${l}`)) ||
    routing.defaultLocale;

  response.headers.set("x-direction", locale === "ar" ? "rtl" : "ltr");

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
