// Augment Next.js request headers typing to include our custom header in dev
declare module 'next/server' {
  interface NextRequest {
    headers: Headers & { get(name: 'x-active-locale'): string | null };
  }
}


