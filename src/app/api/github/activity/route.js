// comments in English
import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';

// server-only activity feed (commits + push events)
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const owner = (url.searchParams.get('owner') || '').trim();
    const repo = (url.searchParams.get('repo') || '').trim();
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const per = Math.min(
      100,
      Math.max(1, parseInt(url.searchParams.get('per_page') || '10', 10))
    );

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Missing owner or repo' },
        { status: 400 }
      );
    }

    // auth header (PAT in env)
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'NexumHub',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // <-- aquí
    };

    // commits
    const commitsUrl = `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=${per}&page=${page}`;
    const commitsRes = await fetch(commitsUrl, { headers, cache: 'no-store' });
    if (!commitsRes.ok) {
      const details = await commitsRes.text();
      return NextResponse.json(
        { error: 'Commits fetch failed', details },
        { status: commitsRes.status }
      );
    }
    const commitsJson = await commitsRes.json();
    const commits = Array.isArray(commitsJson) ? commitsJson : [];

    // push events
    const eventsUrl = `${GITHUB_API}/repos/${owner}/${repo}/events?per_page=${per}&page=${page}`;
    const eventsRes = await fetch(eventsUrl, { headers, cache: 'no-store' });
    const eventsJson = eventsRes.ok ? await eventsRes.json() : [];
    const events = Array.isArray(eventsJson) ? eventsJson : [];

    // pagination (next)
    const link = commitsRes.headers.get('link') || '';
    const has_next = /\brel="next"\b/.test(link);

    // normalize
    const items = normalizeActivity(owner, repo, commits, events, per);

    return NextResponse.json({ items, has_next }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// normalize
function normalizeActivity(owner, repo, commits, events, per) {
  const commitItems = commits.map((c) => ({
    id: c.sha,
    type: 'commit',
    message: c.commit?.message || 'No message',
    author: c.commit?.author?.name || c.author?.login || 'Unknown',
    date: c.commit?.author?.date || c.commit?.committer?.date || null,
    url: c.html_url || `https://github.com/${owner}/${repo}/commit/${c.sha}`,
    sha: c.sha,
  }));

  const pushItems = events
    .filter(
      (e) => e?.type === 'PushEvent' && Array.isArray(e?.payload?.commits)
    )
    .flatMap((e) =>
      e.payload.commits.map((pc) => ({
        id: `${e.id}-${pc.sha}`,
        type: 'push',
        message: pc.message || 'No message',
        author: pc.author?.name || e.actor?.login || 'Unknown',
        date: e.created_at || null,
        url: `https://github.com/${owner}/${repo}/commit/${pc.sha}`,
        sha: pc.sha,
      }))
    );

  const all = [...commitItems, ...pushItems].filter((x) => x.date);
  all.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 👇 cortar en server según "per"
  return all.slice(0, per);
}
