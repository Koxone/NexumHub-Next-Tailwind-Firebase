import React from 'react';

function RepoVisibility({ repo }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
        repo.private
          ? 'text-text-primary bg-pink-600'
          : 'bg-emerald-500 text-black'
      }`}
    >
      {repo.private ? 'private' : 'public'}
    </span>
  );
}

export default RepoVisibility;
