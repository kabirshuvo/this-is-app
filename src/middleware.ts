import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "zu", "de"],

  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|zu|de)/:path*"],
};
