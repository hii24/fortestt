import { NextRequest, NextResponse } from 'next/server';

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
    '/((?!api|_next/static|_next/image|_next/images|images|image|favicon.ico|icons|robots.txt|sitemap.xml).*)',
  ],
};
