// comments in English
import { getAuth, clerkClient as nextClerkClient } from '@clerk/nextjs/server';

const GITHUB_API = 'https://api.github.com';
const DEFAULT_GITHUB_USER = 'Koxone';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    // visibility only matters for authenticated users
    const qv = (url.searchParams.get('visibility') || 'all').toLowerCase();
    const visibility = ['public', 'private', 'all'].includes(qv) ? qv : 'all';

    const { userId } = getAuth(req);

    if (userId) {
      return await getUserRepos(userId, visibility);
    } else {
      // unauthenticated can only see public repos of DEFAULT_GITHUB_USER
      return await getDefaultUserRepos();
    }
  } catch (error) {
    console.error('Error in GitHub repos API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  }
}

// Authenticated user repos (supports public/private/all via visibility)
async function getUserRepos(userId, visibility) {
  // Build a Clerk client that works across SDK shapes
  let client;
  if (typeof nextClerkClient === 'function') {
    client = await nextClerkClient();
  } else {
    client = nextClerkClient;
  }

  // Get the GitHub OAuth access token
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
        hint: 'User must connect GitHub with the required scopes.',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  return await fetchGitHubRepos(accessToken, visibility);
}

// Public default user repos
async function getDefaultUserRepos() {
  const endpoint = `${GITHUB_API}/users/${DEFAULT_GITHUB_USER}/repos?per_page=100&sort=updated&type=public`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Portfolio-Default-View',
  };

  const gh = await fetch(endpoint, { headers, cache: 'no-store' });

  if (!gh.ok) {
    const details = await gh.text();
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch default user repos',
        details,
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  const repos = await gh.json();
  const data = normalizeRepos(repos);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

// Fetch repos for authenticated user with visibility filter
async function fetchGitHubRepos(accessToken, visibility = 'all') {
  const endpoint = `${GITHUB_API}/user/repos?per_page=100&sort=updated&visibility=${encodeURIComponent(
    visibility
  )}`;

  const gh = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'NexumHub',
    },
    cache: 'no-store',
  });

  if (!gh.ok) {
    const details = await gh.text();
    return new Response(
      JSON.stringify({ error: 'GitHub fetch failed', details }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  const repos = await gh.json();
  const data = normalizeRepos(repos);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

// Build public logo URL from raw.githubusercontent.com
function buildPublicLogoUrl(owner, repo, branch, updatedAt) {
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/.github/logo.svg`;
  const t = updatedAt ? `?t=${encodeURIComponent(updatedAt)}` : '';
  return `${base}${t}`;
}

// Build private logo URL through your internal proxy
function buildPrivateLogoUrl(owner, repo, ref) {
  const params = new URLSearchParams({
    owner,
    repo,
    ref: ref || 'main',
  }).toString();
  return `/api/github/private-logo?${params}`;
}

// Normalize repos for the client
function normalizeRepos(repos) {
  return (
    repos
      .map((r) => {
        const owner = r.owner?.login;
        const branch = r.default_branch || 'main';
        const logoUrl = r.private
          ? buildPrivateLogoUrl(owner, r.name, branch)
          : buildPublicLogoUrl(owner, r.name, branch, r.updated_at);

        return {
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
          owner_login: owner,
          topics: Array.isArray(r.topics) ? r.topics : [],
          default_branch: r.default_branch,
          logo_url: logoUrl,
        };
      })
      .sort((a, b) => {
        const tb = new Date(b.pushed_at || b.updated_at).getTime();
        const ta = new Date(a.pushed_at || a.updated_at).getTime();
        if (tb !== ta) return tb - ta;
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      })
  );
}
