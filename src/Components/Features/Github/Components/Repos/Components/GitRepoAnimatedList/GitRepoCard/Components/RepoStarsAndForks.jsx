import React from 'react';

function RepoStarsAndForks({ repo }) {
  return (
    <div>
      <span>⭐ {repo.stargazers_count}</span>
      <span>🍴 {repo.forks_count}</span>
    </div>
  );
}

export default RepoStarsAndForks;
