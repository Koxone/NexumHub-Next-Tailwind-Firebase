import React from 'react';

const LANGUAGE_COLOR = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C#': '#178600',
  C: '#555555',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Rust: '#dea584',
  Dart: '#00B4AB',
  Elixir: '#6e4a7e',
  Scala: '#c22d40',
  'Objective-C': '#438eff',
  Vue: '#41B883',
  Svelte: '#ff3e00',
  SQL: '#e38c00',
};

const FALLBACK = '#9CA3AF';

function textColorFor(hex) {
  try {
    const h = hex.replace('#', '');
    const full =
      h.length === 3
        ? h
            .split('')
            .map((c) => c + c)
            .join('')
        : h;
    const num = parseInt(full, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 140 ? '#000' : '#fff';
  } catch {
    return '#fff';
  }
}

function RepoLanguage({ repo }) {
  const lang = repo?.language;
  if (!lang) return null;

  const bg = LANGUAGE_COLOR[lang] || FALLBACK;
  const color = textColorFor(bg);

  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs leading-none font-medium"
      style={{ backgroundColor: bg, color }}
      title={lang}
    >
      {lang}
    </span>
  );
}

export default RepoLanguage;
