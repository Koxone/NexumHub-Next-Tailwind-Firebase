import React from 'react';

function RepoLanguage({ repo }) {
  return (
    <>
      {repo.language && (
        <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium">
          {repo.language}
        </span>
      )}
    </>
  );
}

export default RepoLanguage;
