'use client';

import { MdSecurity, MdSupportAgent, MdDevices, MdEngineering, MdCloud, MdVerifiedUser } from "react-icons/md";

const features = [
  {
    title: "Advanced Security Solutions",
    description: "Smart CCTV systems with high-resolution cameras and real-time monitoring for reliable, round-the-clock security.",
    icon: MdSecurity,
    color: "from-blue-500 to-blue-700",
    class: "bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-l-4 border-blue-500/60 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-blue-200 transition-all duration-300 group relative overflow-hidden"
  },
  {
    title: "24/7 Support & Monitoring",
    description: "Continuous surveillance and expert support to ensure your security systems run smoothly and respond to threats instantly.",
    icon: MdSupportAgent,
    color: "from-green-500 to-green-700",
    class: "bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-l-4 border-green-500/60 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-green-200 transition-all duration-300 group relative overflow-hidden"
  },
  {
    title: "Smart Technology Integration",
    description: "Seamless integration of CCTV systems with mobile apps, cloud storage, and smart devices for real-time access and control from anywhere.",
    icon: MdDevices,
    color: "from-purple-500 to-purple-700",
    class: "bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-l-4 border-purple-500/60 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-purple-200 transition-all duration-300 group relative overflow-hidden"
  },
  {
    title: "Expert Installation",
    description: "Professional CCTV installation by trained technicians to ensure optimal coverage, performance, and long-term reliability.",
    icon: MdEngineering,
    color: "from-yellow-500 to-yellow-600",
    class: "bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-l-4 border-yellow-500/60 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-yellow-200 transition-all duration-300 group relative overflow-hidden"
  },
  {
    title: "Cloud & Remote Access",
    description: "Secure cloud storage and remote access to your CCTV footage, allowing you to monitor your property anytime, from anywhere.",
    icon: MdCloud,
    color: "from-cyan-500 to-blue-400",
    class: "bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-l-4 border-cyan-500/60 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-cyan-200 transition-all duration-300 group relative overflow-hidden"
  },
  {
    title: "Trusted & Certified",
    description: "Certified security solutions from a trusted provider, ensuring quality, compliance, and peace of mind for every client.",
    icon: MdVerifiedUser,
    color: "from-pink-500 to-red-500",
    class: "bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-l-4 border-pink-500/60 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-pink-200 transition-all duration-300 group relative overflow-hidden"
  }
];

export default function WhatWeDoSection({ addIntro = true }) {
  return (
    <section className="relative px-5 sm:px-10 md:px-20  py-10 sm:py-14 lg:py-20 bg-gray-100 overflow-hidden">

        {addIntro && (
          <div className="mb-10">
            <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
              What We Do
            </h2>
            <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
              Om Network India provides professional CCTV installation, upgrades, and monitoring services. We deliver reliable security solutions tailored to protect homes and businesses with the latest technology.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={feature.class}
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr ${feature.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      
    </section>
  );
}
