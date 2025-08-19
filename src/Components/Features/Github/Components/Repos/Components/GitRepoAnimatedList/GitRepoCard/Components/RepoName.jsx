import React from 'react';

function RepoName({ repo }) {
  return (
    <h4 className="truncate text-base font-semibold text-white">{repo.name}</h4>
  );
}

export default RepoName;
