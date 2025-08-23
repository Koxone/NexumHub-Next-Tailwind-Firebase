'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function StackSection({ className = '' }) {
  const { t } = useTranslation();

  // items renderer
  const renderItems = (items) =>
    items.map((item, i) => (
      <li
        key={i}
        className={[
          'group relative flex flex-col items-center gap-2',
          'rounded-2xl p-3',
          'border border-solid',
          `${item.border}`,
          `${item.bg}`,
          'glow-card backdrop-blur-md',
          `${item.hover}`,
        ].join(' ')}
      >
        <div
          className={[
            'flex h-12 w-12 items-center justify-center p-1',
            'sm:',
            'md:h-15 md:w-15',
            'lg:h-16 lg:w-16',
            'xl:h-17 xl:w-17',
            '2xl:h-14 2xl:w-14',
          ].join(' ')}
        >
          <img
            src={item.url}
            alt={item.tooltip}
            className="h-20 w-20 object-contain"
          />
        </div>
        <span className={`tooltip ${item.text} ${item.border} ${item.bg}`}>
          {item.tooltip}
        </span>
      </li>
    ));

  return (
    <section className={`flex ${className} flex-col items-center gap-10`}>
      {/* title */}
      <div>
        <h2 className="text-text-body mb-2 text-center text-4xl font-bold">
          Stack
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-800" />
      </div>

      {/* main */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-text-body text-lg font-semibold">
          {t('stack.main')}
        </h3>
        <ul className="flex flex-wrap justify-center gap-5">
          {renderItems([
            {
              url: '/Assets/StackIcons/next.svg',
              tooltip: 'Next.js',
              border: 'border-white',
              text: 'text-text-primary',
              bg: 'bg-white/10',
              hover: 'hover-glow-white scale-110',
            },
            {
              url: '/Assets/StackIcons/js.png',
              tooltip: 'Javascript',
              border: 'border-amber-500',
              text: 'text-amber-500',
              bg: 'bg-amber-500/10',
              hover: 'hover-glow-amber',
            },
            {
              url: '/Assets/StackIcons/react.svg',
              tooltip: 'React',
              border: 'border-cyan-300',
              text: 'text-cyan-300',
              bg: 'bg-cyan-300/10',
              hover: 'hover-glow-cyan scale-110',
            },
            {
              url: '/Assets/StackIcons/tailwind.svg',
              tooltip: 'Tailwind',
              border: 'border-sky-400',
              text: 'text-sky-400',
              bg: 'bg-sky-400/10',
              hover: 'hover-glow-sky scale-110',
            },
          ])}
        </ul>
      </div>

      {/* secondary */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-text-body text-lg font-semibold">
          {t('stack.also')}
        </h3>
        <ul className="flex flex-wrap justify-center gap-5">
          {renderItems([
            {
              url: '/Assets/StackIcons/astro.png',
              tooltip: 'Astro',
              border: 'border-purple-400',
              text: 'text-purple-400',
              bg: 'bg-purple-400/10',
              hover: 'hover-glow-purple',
            },
            {
              url: '/Assets/StackIcons/react.svg',
              tooltip: 'React',
              border: 'border-cyan-400',
              text: 'text-cyan-400',
              bg: 'bg-cyan-400/10',
              hover: 'hover-glow-cyan scale-105',
            },
            {
              url: '/Assets/StackIcons/tailwind.svg',
              tooltip: 'Tailwind',
              border: 'border-sky-400',
              text: 'text-sky-400',
              bg: 'bg-sky-400/10',
              hover: 'hover-glow-sky scale-105',
            },
          ])}
        </ul>
      </div>

      {/* tools */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-text-body text-lg font-semibold">
          {t('stack.tools')}
        </h3>
        <ul className="grid grid-cols-5 justify-center gap-5">
          {renderItems([
            {
              url: '/Assets/StackIcons/html.png',
              tooltip: 'HTML',
              border: 'border-orange-500',
              text: 'text-orange-500',
              bg: 'bg-orange-500/10',
              hover: 'hover-glow-orange',
            },
            {
              url: '/Assets/StackIcons/css.png',
              tooltip: 'CSS',
              border: 'border-blue-500',
              text: 'text-blue-500',
              bg: 'bg-blue-500/10',
              hover: 'hover-glow-blue',
            },
            {
              url: '/Assets/StackIcons/vite.png',
              tooltip: 'Vite',
              border: 'border-purple-400',
              text: 'text-purple-400',
              bg: 'bg-purple-400/10',
              hover: 'hover-glow-purple',
            },
            {
              url: '/Assets/StackIcons/firebase.png',
              tooltip: 'Firebase',
              border: 'border-amber-500',
              text: 'text-amber-500',
              bg: 'bg-amber-500/10',
              hover: 'hover-glow-amber',
            },
            {
              url: '/Assets/StackIcons/shopify.svg',
              tooltip: 'Shopify',
              border: 'border-emerald-400',
              text: 'text-emerald-400',
              bg: 'bg-emerald-400/10',
              hover: 'hover-glow-lime',
            },
            {
              url: '/Assets/StackIcons/postman.svg',
              tooltip: 'Postman',
              border: 'border-orange-400',
              text: 'text-orange-400',
              bg: 'bg-orange-400/10',
              hover: 'hover-glow-orange',
            },
            {
              url: '/Assets/StackIcons/i18.svg',
              tooltip: 'i18Next',
              border: 'border-lime-400',
              text: 'text-lime-400',
              bg: 'bg-lime-400/10',
              hover: 'hover-glow-lime',
            },
            {
              url: '/Assets/StackIcons/figma.png',
              tooltip: 'Figma',
              border: 'border-pink-500',
              text: 'text-pink-500',
              bg: 'bg-pink-500/10',
              hover: 'hover-glow-pink',
            },
            {
              url: '/Assets/StackIcons/FramerMotion.svg',
              tooltip: 'Framer Motion',
              border: 'border-purple-400',
              text: 'text-purple-400',
              bg: 'bg-purple-400/10',
              hover: 'hover-glow-purple',
            },
            {
              url: '/Assets/StackIcons/Shadcn-UI.svg',
              tooltip: 'Shadcn/UI',
              border: 'border-white',
              text: 'text-text-primary',
              bg: 'bg-white/10',
              hover: 'hover-glow-white scale-110',
            },
            {
              url: '/Assets/StackIcons/prettier.png',
              tooltip: 'Prettier',
              border: 'border-indigo-400',
              text: 'text-indigo-400',
              bg: 'bg-indigo-400/10',
              hover: 'hover-glow-indigo',
            },
            {
              url: '/Assets/StackIcons/git.png',
              tooltip: 'Git',
              border: 'border-orange-600',
              text: 'text-orange-600',
              bg: 'bg-orange-600/10',
              hover: 'hover-glow-orange',
            },
            {
              url: '/Assets/StackIcons/github.svg',
              tooltip: 'GitHub',
              border: 'border-neutral-500',
              text: 'text-neutral-200',
              bg: 'bg-neutral-500/10',
              hover: 'hover-glow-white',
            },
            {
              url: '/Assets/StackIcons/linux.png',
              tooltip: 'Linux',
              border: 'border-yellow-500',
              text: 'text-yellow-500',
              bg: 'bg-yellow-500/10',
              hover: 'hover-glow-yellow',
            },
            {
              url: '/Assets/StackIcons/npm.png',
              tooltip: 'NPM',
              border: 'border-red-500',
              text: 'text-red-500',
              bg: 'bg-red-500/10',
              hover: 'hover-glow-red',
            },
            {
              url: '/Assets/StackIcons/vercel.svg',
              tooltip: 'Vercel',
              border: 'border-neutral-400',
              text: 'text-text-body',
              bg: 'bg-neutral-500/10',
              hover: 'hover-glow-white',
            },
          ])}
        </ul>
      </div>
    </section>
  );
}
