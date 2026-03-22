import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  const host = request.headers.get('host') || '';

  // Block search engines from indexing the Vercel subdomain
  // Only collegeandfees.com should be indexed by Google
  if (host.includes('vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
