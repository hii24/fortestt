import { NextRequest, NextResponse } from 'next/server';
import {locales, defaultLocale} from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  const isAdminDomain = hostname.startsWith('admin.');

  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  if (isAdminDomain && !pathname.startsWith('/admin')) {
    const url = new URL(`/admin${pathname}${search}`, request.url);
    return NextResponse.rewrite(url);
  }

  const { cookies } = request;

  // i18n: redirect top-level routes to default locale if no locale prefix present
  const hasLocalePrefix = locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`));
  const missingLocalePrefix = !hasLocalePrefix;
  const isPublicAsset = pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.startsWith('/image') || pathname.startsWith('/icons') || pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname.startsWith('/_vercel');
  if (missingLocalePrefix && !isPublicAsset && !pathname.startsWith('/admin') && !pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }
  // If locale prefix present, persist it in cookie and rewrite to path without the prefix
  const localeMatch = pathname.match(/^\/(en|ru)(?:\/|$)/);
  if (localeMatch) {
    const activeLocale = localeMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/(en|ru)(?=\/|$)/, '') || '/';
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-active-locale', activeLocale);
    const response = NextResponse.rewrite(url, {request: {headers: requestHeaders}} as any);
    response.cookies.set('NEXT_LOCALE', activeLocale, {path: '/', sameSite: 'lax'});
    return response;
  }

  // if development comment this
  // from here -------------

  const haveRefreshCookie = cookies.get('refresh')?.value;
  const AdminRole: boolean = !!JSON.parse(cookies.get('is_admin')?.value ?? 'false');

  if (pathname.startsWith('/admin') && (!haveRefreshCookie || !AdminRole)) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // till here ------------

  // if (!isAdminDomain && pathname.startsWith('/admin')) {
  //   const url = new URL(request.url);
  //   url.host = `admin.${url.host.replace('admin.', '')}`;
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/images|images|image|favicon.ico|icons|robots.txt|sitemap.xml).*)',
  ],
};
