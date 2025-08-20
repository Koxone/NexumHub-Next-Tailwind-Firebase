import React from 'react';

function RepoTopics({ repo }) {
  return (
    <>
      {Array.isArray(repo.topics) &&
        repo.topics.slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-full bg-violet-500/15 px-2 py-0.5 text-violet-300 capitalize"
          >
            {t}
          </span>
        ))}

      {repo.topics?.length > 6 && (
        <span className="rounded-full bg-white/10 px-2 py-0.5">
          +{repo.topics.length - 6}
        </span>
      )}
    </>
  );
}

export default RepoTopics;
