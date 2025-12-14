import React, { useEffect, useRef, useState } from 'react';
import './MarketingCarousel.css';

const DEFAULT_IMAGES = [
  '/assets/app-image-1.png',
  '/assets/app-image-2.png',
  '/assets/app-image-3.png',
];

function clampIndex(index, length) {
  if (length === 0) return 0;
  if (index < 0) return length - 1;
  if (index >= length) return 0;
  return index;
}

const MarketingCarousel = ({ images = DEFAULT_IMAGES, intervalMs = 3500 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, images, intervalMs]);

  const startAutoplay = () => {
    stopAutoplay();
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => clampIndex(prev + 1, images.length));
    }, intervalMs);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goto = (nextIndex) => {
    setActiveIndex(clampIndex(nextIndex, images.length));
  };

  const onMouseEnter = () => {
    isHoveringRef.current = true;
    stopAutoplay();
  };

  const onMouseLeave = () => {
    isHoveringRef.current = false;
    startAutoplay();
  };

  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    stopAutoplay();
  };

  const onTouchEnd = (e) => {
    const startX = touchStartXRef.current;
    if (startX == null) return;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    const swipeThreshold = 40; // px
    if (delta > swipeThreshold) {
      goto(activeIndex - 1);
    } else if (delta < -swipeThreshold) {
      goto(activeIndex + 1);
    }
    touchStartXRef.current = null;
    if (!isHoveringRef.current) startAutoplay();
  };

  if (!images || images.length === 0) return null;

  return (
    <section className="marketing-carousel">
      <div
        className="carousel-frame"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div className="carousel-slide" key={idx} role="img" aria-label={`Visuel ${idx + 1}`}>
              <img src={src} alt="Main tenant un smartphone avec l'app Pick and Tag ouverte" loading="lazy" />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button className="nav prev" aria-label="Précédent" onClick={() => goto(activeIndex - 1)}>
              ‹
            </button>
            <button className="nav next" aria-label="Suivant" onClick={() => goto(activeIndex + 1)}>
              ›
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="dots" role="tablist" aria-label="Sélection des visuels">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={idx === activeIndex ? 'dot active' : 'dot'}
                aria-label={`Aller au visuel ${idx + 1}`}
                aria-selected={idx === activeIndex}
                onClick={() => goto(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketingCarousel;


