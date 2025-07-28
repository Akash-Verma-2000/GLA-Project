'use client';

import { useRef } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Business Owner",
    image: "/images/Mohit-Profile-Picture.jpg",
    quote: "Om Network India provided us with a seamless security solution. Their team is professional, responsive, and truly cares about customer satisfaction.",
    rating: 5
  },
  {
    name: "Priya Singh",
    role: "School Principal",
    image: "/images/Mohit-Profile-Picture.jpg",
    quote: "The installation was quick and the support is outstanding. I feel much safer knowing our campus is protected by their systems.",
    rating: 5
  },
  {
    name: "Rahul Mehra",
    role: "IT Manager",
    image: "/images/Mohit-Profile-Picture.jpg",
    quote: "Their cloud and mobile access features are a game changer. Highly recommended for anyone looking for modern security solutions.",
    rating: 4
  },
  {
    name: "Sunita Verma",
    role: "Homeowner",
    image: "/images/Mohit-Profile-Picture.jpg",
    quote: "Affordable, reliable, and easy to use. The team explained everything and made sure we were comfortable with the system.",
    rating: 5
  }
];

function Stars({ count }) {
  return (
    <div className="flex items-center justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? 'text-yellow-400 drop-shadow' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1.5 12.6,7.5 19,8 14,12.3 15.5,18.5 10,15.2 4.5,18.5 6,12.3 1,8 7.4,7.5" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSection({ addIntro = true }) {
  const scrollRef = useRef(null);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {addIntro && (
          <div className="mb-10">
            <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
              Frequently Asked Questions
            </h2>
            <p className="text-md font-semibold text-center !text-gray-800 text-sm md:text-md lg:text-lg">
              Find quick answers to common questions about our security solutions, installation process, pricing, and support services. Our FAQ section is designed to help you make informed decisions and understand how Om Network India ensures your safety with reliable and efficient systems.</p>
          </div>
        )}
        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Scroll testimonials left"
            onClick={() => scrollBy(-350)}
            className="hidden md:flex items-center justify-center absolute -left-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 shadow-lg border border-primary/30 hover:bg-primary hover:text-white transition text-primary"
            style={{ backdropFilter: 'blur(6px)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Scroll testimonials right"
            onClick={() => scrollBy(350)}
            className="hidden md:flex items-center justify-center absolute -right-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 shadow-lg border border-primary/30 hover:bg-primary hover:text-white transition text-primary"
            style={{ backdropFilter: 'blur(6px)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="overflow-x-auto no-scrollbar" ref={scrollRef}>
            <div className="flex gap-8 sm:gap-12 py-4 min-w-[600px]">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center min-w-[280px] max-w-[350px] bg-gradient-to-br from-white/80 via-blue-50/80 to-primary/10 backdrop-blur-lg rounded-3xl p-8 border-l-4 border-primary/60 transition-all duration-300 group overflow-visible hover:-translate-y-2"
                >
                  {/* Glowing border on hover */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:shadow-[0_0_40px_0_rgba(59,130,246,0.15)] group-hover:ring-2 group-hover:ring-primary/30 transition" />
                  {/* Watermark quote icon */}
                  <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none z-0">
                    <svg className="w-20 h-20 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.17 15A3.17 3.17 0 0 1 4 11.83V11a5 5 0 0 1 5-5h.5a1.5 1.5 0 0 1 0 3H9a2 2 0 0 0-2 2v.83A1.17 1.17 0 0 0 8.17 15ZM19.17 15A3.17 3.17 0 0 1 16 11.83V11a5 5 0 0 1 5-5h.5a1.5 1.5 0 0 1 0 3H21a2 2 0 0 0-2 2v.83A1.17 1.17 0 0 0 19.17 15Z" />
                    </svg>
                  </div>
                  {/* Speech bubble pointer */}
                  <div className="absolute left-10 -bottom-4 w-8 h-8 bg-white/80 rotate-45 border-l-4 border-b-4 border-primary/20 rounded-bl-2xl shadow -z-10" />
                  {/* Floating profile image */}
                  <div className="relative w-24 h-24 mb-4 mt-2 z-10">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 to-blue-400/20 blur-lg opacity-70 group-hover:opacity-90 transition" />
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover rounded-full border-4 border-primary shadow-lg"
                      sizes="96px"
                    />
                  </div>
                  <Stars count={t.rating} />
                  <div className="text-lg font-semibold text-primary mb-1">{t.name}</div>
                  <div className="text-sm font-semibold text-gray-500 mb-4">{t.role}</div>
                  <div className="text-gray-700 font-semibold text-sm italic leading-relaxed z-10">
                    “{t.quote}”
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Hide scrollbar style */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
