import React from 'react';

function RepoName({ repo }) {
  return (
    <h4 className="text-text-primary truncate text-base font-semibold">
      {repo.name}
    </h4>
  );
}

export default RepoName;
