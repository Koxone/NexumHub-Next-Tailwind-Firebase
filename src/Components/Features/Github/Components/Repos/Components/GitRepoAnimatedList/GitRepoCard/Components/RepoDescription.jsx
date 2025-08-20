import React from 'react';

function RepoDescription({ repo }) {
  return (
    <p className="text-text-body line-clamp-2 text-sm">
      {repo.description || 'No description available'}
    </p>
  );
}

export default RepoDescription;
