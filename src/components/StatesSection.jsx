'use client';

import { useRef, useEffect, useState } from 'react';
import {
  MdCameraAlt, MdPeople, MdSentimentSatisfiedAlt, MdLocationCity, MdHome, MdBusiness,
  MdAccessTime, MdSupportAgent, MdRepeat, MdEngineering, MdCheckCircle, MdTimer
} from "react-icons/md";

const stats = [
  {
    label: "Cameras Installed",
    value: "40,000+",
    icon: MdCameraAlt,
    color: "from-blue-500 to-blue-700",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300 group"
  },
  {
    label: "Clients Served",
    value: "6000+",
    icon: MdPeople,
    color: "from-green-500 to-green-700",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-green-200 transition-all duration-300 group"
  },
  {
    label: "Client Satisfaction Rate",
    value: "99.5%",
    icon: MdSentimentSatisfiedAlt,
    color: "from-yellow-500 to-yellow-600",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-yellow-200 transition-all duration-300 group"
  },
  {
    label: "Cities Covered",
    value: "10+",
    icon: MdLocationCity,
    color: "from-purple-500 to-purple-700",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-purple-200 transition-all duration-300 group"
  },
  {
    label: "Homes Secured",
    value: "5000+",
    icon: MdHome,
    color: "from-pink-500 to-pink-600",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-pink-200 transition-all duration-300 group"
  },
  {
    label: "Businesses Secured",
    value: "1000+",
    icon: MdBusiness,
    color: "from-cyan-500 to-blue-400",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-cyan-200 transition-all duration-300 group"
  },
  {
    label: "Years of Service",
    value: "10+",
    icon: MdAccessTime,
    color: "from-indigo-500 to-indigo-700",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-indigo-200 transition-all duration-300 group"
  },
  {
    label: "Repeat Clients",
    value: "200+",
    icon: MdRepeat,
    color: "from-orange-500 to-orange-600",
    class: "flex flex-col items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 hover:-translate-y-2 hover:shadow-orange-200 transition-all duration-300 group"
  },
];

function parseNumber(str) {
  const match = str.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: "" };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

function AnimatedNumber({ value, start, duration = 1200 }) {
  const { num, suffix } = parseNumber(value);
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(start ? 0 : num);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !start) return;
    if (isNaN(num)) {
      setDisplay(value); // For "Yes"
      return;
    }
    let startTimestamp = null;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplay(Math.floor(progress * (num - 0) + 0));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(num);
      }
    }
    requestAnimationFrame(step);
  }, [start, num, value, mounted]);

  // For floats (like 99.2%), show one decimal
  const isFloat = value.includes('.') && !isNaN(num);
  return (
    <span>
      {isNaN(num)
        ? value
        : isFloat
          ? display.toFixed(1)
          : display}
      {suffix}
    </span>
  );
}

export default function StatesSection() {
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStart(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-200 px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={stat.class}
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr ${stat.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-3xl text-white" />
                </div>
                <div className="text-3xl font-extrabold text-primary mb-1">
                  <AnimatedNumber value={stat.value + (stat.suffix || "")} start={start} />
                </div>
                <div className="text-base text-gray-700 text-center font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
    </section>
  );
}