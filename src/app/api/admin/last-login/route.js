// comments in English
import { clerkClient as nextClerkClient } from '@clerk/nextjs/server';

function toClientShape(c) {
  // Support both shapes across Clerk SDKs
  return typeof c === 'function' ? c() : c;
}

function toDateMaybe(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  if (typeof val === 'number') return new Date(val);
  return new Date(val);
}

export async function GET() {
  const TARGET_ID = process.env.CLERK_TARGET_USER_ID?.trim() || null;
  const TARGET_EMAIL = process.env.CLERK_TARGET_USER_EMAIL?.trim() || null;

  if (!TARGET_ID && !TARGET_EMAIL) {
    return new Response(
      JSON.stringify({
        error: 'Missing target',
        hint: 'Define CLERK_TARGET_USER_ID o CLERK_TARGET_USER_EMAIL en .env.local',
      }),
      { status: 400 }
    );
  }

  // Build client robustly
  const maybeClient = await toClientShape(nextClerkClient);
  let user;

  try {
    if (TARGET_ID) {
      user = await maybeClient.users.getUser(TARGET_ID);
    } else {
      const list = await maybeClient.users.getUserList({ emailAddress: [TARGET_EMAIL] });
      const u = Array.isArray(list?.data) ? list.data[0] : Array.isArray(list) ? list[0] : null;
      if (!u) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      user = await maybeClient.users.getUser(u.id);
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Clerk fetch failed', details: String(e) }), {
      status: 502,
    });
  }

  const lastSignInAt = toDateMaybe(user?.lastSignInAt)?.toISOString() || null;
  const updatedAt = toDateMaybe(user?.updatedAt)?.toISOString() || null;

  return new Response(JSON.stringify({ userId: user.id, lastSignInAt, updatedAt }), {
    status: 200,
  });
}
