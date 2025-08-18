import React from 'react';

function RepoDescription({ repo }) {
  return (
    <p className="line-clamp-2 text-sm text-neutral-300">
      {repo.description || 'No description available'}
    </p>
  );
}

export default RepoDescription;
