import { NextRequest, NextResponse } from "next/server";

/**
 * Redirects the bare root URL to a locale-prefixed page.
 * Arabic-preferring browsers land on /ar, everyone else on /en.
 * (Temporary 307 redirect: the destination depends on the visitor's language.)
 */
export function middleware(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const locale = acceptLanguage.split(",")[0]?.trim().startsWith("ar") ? "ar" : "en";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ["/"],
};
