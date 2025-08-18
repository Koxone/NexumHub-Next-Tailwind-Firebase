import React from 'react';

function RepoLogo({ repo }) {
  return (
    <img src={repo.logo_url} alt={`${repo.name} logo`} width={24} height={24} />
  );
}

export default RepoLogo;
