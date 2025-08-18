// comments in English
import { getAuth, clerkClient as nextClerkClient } from '@clerk/nextjs/server';

const GITHUB_API = 'https://api.github.com';

export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let client;
    if (typeof nextClerkClient === 'function') {
      client = await nextClerkClient();
    } else {
      client = nextClerkClient;
    }

    let tokenResp;
    if (client?.users?.getUserOauthAccessToken) {
      tokenResp = await client.users.getUserOauthAccessToken(userId, 'github');
    } else {
      const { Clerk } = await import('@clerk/backend');
      const backendClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
      tokenResp = await backendClient.users.getUserOauthAccessToken(
        userId,
        'github'
      );
    }

    const arr = Array.isArray(tokenResp) ? tokenResp : tokenResp?.data;
    const accessToken = arr?.[0]?.token;

    if (!accessToken) {
      return new Response(
        JSON.stringify({
          error: 'GitHub token not found',
          hint: 'Asegúrate que el usuario conectó GitHub y aceptó los scopes; cierra sesión y vuelve a entrar.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const gh = await fetch(
      `${GITHUB_API}/user/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'NexumHub',
        },
        cache: 'no-store',
      }
    );

    if (!gh.ok) {
      const details = await gh.text();
      return new Response(
        JSON.stringify({ error: 'GitHub fetch failed', details }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const repos = await gh.json();

    const data = repos
      .map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        private: r.private,
        description: r.description,
        html_url: r.html_url,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        fork: r.fork,
        pushed_at: r.pushed_at,
        updated_at: r.updated_at,
        owner_login: r.owner?.login,
      }))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in GitHub repos API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
