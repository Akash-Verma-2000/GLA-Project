'use client';
import { FaHome } from "react-icons/fa";
import { MdOutlineCameraswitch } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi";
import Link from "next/link";

export default function PageIntroSection({
    title,
    routes,
    description
}) {
    return (
        <section className="relative py-12 px-5 sm:px-10 lg:px-20  bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-hidden">

            {/* Decorative watermark camera icon */}
            <div className="absolute right-8 top-2 opacity-10 pointer-events-none select-none z-0">
                <MdOutlineCameraswitch className="w-40 h-40 text-primary" />
            </div>

            <div className="relative z-10">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-base font-medium mb-4">
                    <FaHome className="text-primary font-bold" />
                    {routes.map((route, idx) => (
                        <span key={route.href || route.label} className="flex items-center gap-2">
                            {idx > 0 && (
                                <HiChevronRight className="w-5 h-5 text-primary drop-shadow" />
                            )}
                            {route.href ? (
                                <Link
                                    href={route.href}
                                    className="text-primary hover:text-black transition-colors duration-200 px-2 py-1 rounded-md hover:bg-primary/10"
                                >
                                    {route.icon && <span className="mr-1">{route.icon}</span>}
                                    {route.label}
                                </Link>
                            ) : (
                                <span className="font-bold text-black bg-primary/10 px-2 py-1 rounded-md shadow-sm">
                                    {route.label}
                                </span>
                            )}
                        </span>
                    ))}
                </nav>

                {/* Title with icon */}
                <div className="flex items-center gap-4 mb-2">
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <MdOutlineCameraswitch className="w-10 h-10 text-primary" />
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary to-blue-900 bg-clip-text text-transparent">
                        {title}
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="text-sm md:text-lg text-gray-600 mt-2 font-medium">
                    {description}
                </p>
                
            </div>
        </section>
    );
}