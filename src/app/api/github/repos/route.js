// comments in English
import { getAuth, clerkClient as nextClerkClient } from '@clerk/nextjs/server';

const GITHUB_API = 'https://api.github.com';

// Tu configuración por defecto
const DEFAULT_GITHUB_USER = 'Koxone'; // Tu username de GitHub

export async function GET(req) {
  try {
    // 1) Check if user is authenticated
    const { userId } = getAuth(req);

    if (userId) {
      // Usuario autenticado - usar su token
      return await getUserRepos(userId);
    } else {
      // Usuario no autenticado - mostrar tus repos
      return await getDefaultUserRepos();
    }
  } catch (error) {
    console.error('Error in GitHub repos API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Función para repos del usuario autenticado (tu código original)
async function getUserRepos(userId) {
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
        hint: 'Asegúrate que el usuario conectó GitHub y aceptó los scopes; cierra sesión y vuelve a entrar.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return await fetchGitHubRepos(accessToken, 'user');
}

// Función para mostrar tus repos por defecto
async function getDefaultUserRepos() {
  // Solo repos públicos - sin token necesario
  const endpoint = `${GITHUB_API}/users/${DEFAULT_GITHUB_USER}/repos?per_page=100&sort=updated&type=public`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'Portfolio-Default-View',
  };

  const gh = await fetch(endpoint, {
    headers,
    cache: 'no-store',
  });

  if (!gh.ok) {
    const details = await gh.text();
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch default user repos',
        details,
        hint: 'Verifica que el usuario por defecto existe y sus repos son públicos',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const repos = await gh.json();
  const data = normalizeRepos(repos);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Función reutilizable para fetch de GitHub
async function fetchGitHubRepos(accessToken, type) {
  const gh = await fetch(`${GITHUB_API}/user/repos?per_page=100&sort=updated`, {
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
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const repos = await gh.json();
  const data = normalizeRepos(repos);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Get Repo Logo
function buildPublicLogoUrl(owner, repo, branch, updatedAt) {
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/.github/logo.svg`;
  const t = updatedAt ? `?t=${encodeURIComponent(updatedAt)}` : '';
  return `${base}${t}`;
}

// Función para normalizar repos
function normalizeRepos(repos) {
  return repos
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
      topics: Array.isArray(r.topics) ? r.topics : [],
      default_branch: r.default_branch,
      logo_url: buildPublicLogoUrl(
        r.owner?.login,
        r.name,
        r.default_branch,
        r.updated_at
      ),
    }))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}
