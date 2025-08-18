import React from 'react';

function RepoDate({ repo }) {
  return (
    <span className="ml-auto text-[11px]">
      Updated {new Date(repo.updated_at).toLocaleDateString()}
    </span>
  );
}

export default RepoDate;
