// comments in English
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Minimal init only. No auth().protect, no redirects.
export default clerkMiddleware(() => NextResponse.next());

export const config = {
  // Run on everything except Next internals and static files
  matcher: ['/((?!_next|.*\\..*).*)'],
};
