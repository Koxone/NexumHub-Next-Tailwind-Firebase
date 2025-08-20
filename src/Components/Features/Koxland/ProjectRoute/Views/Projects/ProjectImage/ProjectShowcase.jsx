'use client';

import React, { useState, useEffect } from 'react';

const ProjectShowcase = ({ alt, src, gallery, slideshow, srcSlide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.from(
    { length: 13 },
    (_, i) => `/${srcSlide}/${i + 1}.webp`
  );

  const openSlideshow = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeSlideshow = () => setIsOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeSlideshow();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Main Image */}
      <div className="relative flex flex-col gap-4">
        <div
          className="border-border-main/50 relative aspect-video cursor-pointer overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-lg"
          onClick={() => openSlideshow(0)}
        >
          <img
            alt={alt}
            className="h-full w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
            src={src}
          />
        </div>
        <div className="self-center text-center">
          <p className="text-text-primary text-xl leading-tight font-bold tracking-tight lg:text-3xl">
            {gallery}
          </p>
          <p className="self-center text-sm text-gray-400">{slideshow}</p>
        </div>
      </div>

      {/* Slideshow */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeSlideshow}
        >
          <button
            className="text-text-primary absolute top-6 right-6 cursor-pointer text-3xl font-bold"
            onClick={closeSlideshow}
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="text-text-primary absolute left-6 cursor-pointer text-4xl font-bold"
          >
            ‹
          </button>

          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[80vw] cursor-zoom-in rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="text-text-primary absolute right-6 cursor-pointer text-4xl font-bold"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectShowcase;
