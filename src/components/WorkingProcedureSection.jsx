'use client';

import { useEffect, useRef } from 'react';
import { MdAssessment, MdDraw, MdBuild, MdVerified, MdSecurity, MdSupportAgent } from "react-icons/md";

const steps = [
    {
        title: "Initial Assessment",
        description: "On-site evaluation to understand your security requirements and identify potential risks for a customized solution.",
        icon: MdAssessment,
        color: "from-blue-500 to-blue-600",
        border: "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-blue-600"
    },
    {
        title: "Solution Design",
        description: "Tailored security system planning using advanced technology to match your environment and budget perfectly.",
        icon: MdDraw,
        color: "from-purple-500 to-purple-600",
        border: "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-purple-600"
    },
    {
        title: "Installation",
        description: "Professional setup of all security equipment with attention to detail, ensuring optimal coverage and performance.",
        icon: MdBuild,
        color: "from-green-500 to-green-600",
        border: "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-green-600"
    },
    {
        title: "Testing & Training",
        description: "Thorough system testing and hands-on user training to ensure complete understanding and seamless operation.",
        icon: MdVerified,
        color: "from-yellow-500 to-yellow-600",
        border: "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-yellow-600"
    },
    {
        title: "24/7 Monitoring",
        description: "Continuous surveillance and instant alerts for real-time threat detection and rapid response around the clock",
        icon: MdSecurity,
        color: "from-red-500 to-red-600",
        border: "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-red-600"
    },
    {
        title: "Ongoing Support",
        description: "Regular maintenance, updates, and technical support to keep your systems running smoothly and efficiently.",
        icon: MdSupportAgent,
        color: "from-indigo-500 to-indigo-600",
        border: "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-indigo-600"
    }
];

export default function WorkingProcedureSection({ addIntro = true }) {
    return (
        <section className="bg-gray-100 px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">
            {addIntro && (
                <div className="mb-10">
                    <h2 className="bg-gradient-to-r from-primary pb-2 to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
                        Our Working Procedure
                    </h2>
                    <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
                        At Om Network India, our working procedure is designed for clarity and efficiency. We begin with a detailed assessment, followed by customized planning and seamless installation, ensuring reliable security solutions that meet your specific needs.
                    </p>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/50 to-transparent z-0" />
                    {/* Steps */}
                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <StepCard key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index }) {
    const cardRef = useRef(null);
    const Icon = step.icon;

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px'
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`relative opacity-0 translate-y-8 transition-all duration-700 ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'} `}>
            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary/80 border-4 border-white shadow-lg z-10 " />
            <div className={`w-full sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} `}>
                <div className={step.border}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                            <Icon className="text-2xl text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-primary mb-1">Step {index + 1}</div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {step.title}
                            </h3>
                        </div>
                    </div>
                    <p className="text-gray-600">
                        {step.description}
                    </p>
                </div>
            </div>
        </div>
    );
}


