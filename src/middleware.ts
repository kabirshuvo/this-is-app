import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from "next-intl/middleware";

// Create intl middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "zu", "de"],
  defaultLocale: "en"
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get the selected language from cookies
  const selectedLang = request.cookies.get("language")?.value;

  // If Zulu is selected, redirect all English routes to under-construction
  if (selectedLang === "zu" && pathname.startsWith("/en")) {
    return NextResponse.redirect(new URL("/zu/under-construction", request.url));
  }

  // If the path starts with /zu and is not already /zu/under-construction
  if (pathname.startsWith('/zu') && !pathname.includes('under-construction')) {
    return NextResponse.redirect(new URL('/zu/under-construction', request.url));
  }

  // For all other routes, use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
