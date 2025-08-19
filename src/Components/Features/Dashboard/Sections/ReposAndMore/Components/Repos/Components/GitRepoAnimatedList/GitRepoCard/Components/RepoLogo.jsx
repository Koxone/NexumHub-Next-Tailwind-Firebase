import React from 'react';

function RepoLogo({ repo, className = '' }) {
  return (
    <img
      src={repo.logo_url}
      alt={`${repo.name} logo`}
      className={`${className}`}
    />
  );
}

export default RepoLogo;

// // Un solo repo (el primero)
// <RepoLogo repo={repos[0]} />

// // Todos los repos
// {repos.map(r => <RepoLogo key={r.id} repo={r} />)}

// Uno específico (ej: "mi-repo")
// const repo = repos.find((r) => r.name === 'Portfolio-Next-Tailwind');
// repo && <RepoLogo repo={repo} />
