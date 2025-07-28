'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const brands = [
  { name: "CP Plus", logo: "/icons/CP-Plus-Logo.jpg" },
  { name: "Dahua", logo: "/icons/Dhua-Logo.jpg" },
  { name: "Hik Vision", logo: "/icons/Hik-Vision-Logo.jpg" },
  { name: "Om Network India", logo: "/icons/Main-Logo.png" },
  { name: "TVS Technology", logo: "/icons/TVS-Logo.jpg" }
];

export default function BrandsSection({ addIntro = true }) {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Auto-scroll logic
  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const totalScrollWidth = container.scrollWidth / 2;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!container) return;
      if (container.scrollLeft >= totalScrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    }, 10);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Pause/resume logic for drag/touch
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const pause = () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    const resume = () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        startAutoScroll();
      }, 1000); // 1 second after user stops
    };

    // Mouse events
    container.addEventListener('pointerdown', pause);
    container.addEventListener('pointerup', resume);
    container.addEventListener('mouseleave', resume);

    // Touch events (for mobile)
    container.addEventListener('touchstart', pause, { passive: true });
    container.addEventListener('touchend', resume, { passive: true });

    // Also pause on hover (optional, for desktop)
    container.addEventListener('mouseenter', pause);

    return () => {
      container.removeEventListener('pointerdown', pause);
      container.removeEventListener('pointerup', resume);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
      container.removeEventListener('mouseenter', pause);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <section className="bg-gray-100 px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">

      {addIntro && (
        <div className="mb-10">
          <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
            Brands We Work With
          </h2>
          <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
            At Om Network India, we work with leading global brands to deliver trusted and high-quality security solutions. Our partnerships ensure access to the latest technology, offering unmatched reliability and performance for every client.
          </p>
        </div>
      )}

      <div className="relative">
        <div
          ref={scrollRef}
          className="hide-scrollbar overflow-x-auto"
          style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
        >
          <div className="flex gap-8 sm:gap-12 py-4 min-w-[600px]">
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center min-w-[160px] sm:min-w-[200px] bg-white/80 rounded-2xl shadow-md p-4 mx-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative mb-3 rounded-xl overflow-hidden shadow group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    className="rounded-xl"
                    width={1920}
                    height={1920}
                  />
                </div>
                <div className="text-base font-semibold text-gray-800 text-center">{brand.name}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}