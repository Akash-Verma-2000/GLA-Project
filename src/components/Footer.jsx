'use client'

import { MdMyLocation, MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

import Link from "next/link";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-gradient-to-b from-gray-200 to-white pt-16 px-5 sm:px-10 md:px-20  relative overflow-hidden">
            {/* Decorative background dots */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg width="100%" height="100%" className="opacity-5" style={{position: 'absolute', left: 0, top: 0}}>
                    <defs>
                        <pattern id="footer-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="#3b82f6" /> {/* Blue dots */}
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#footer-dots)" />
                </svg>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

                {/* About Us */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <h3 className="text-primary text-2xl font-bold mb-4">Om Network India</h3>
                    <p className="text-gray-600">
                        <span className="font-semibold text-primary">Om Network India</span> is your trusted partner in smart surveillance and security solutions. From advanced CCTV installations to real-time remote monitoring, we empower homes and businesses with reliable protection. Our mission is to make safety simple, smart, and accessible across India.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1">
                    <h3 className="text-primary text-xl font-bold mb-4">Quick Links</h3>
                    <nav className="flex flex-col gap-2">
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> Home</Link>
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/services"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> Services</Link>
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/past-projects"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> Past Projects</Link>
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/frequently-asked-questions"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> FAQs</Link>
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/about-us"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> About Us</Link>
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/privacy-policy"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> Privacy Policy</Link>
                        <Link className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200 flex items-center gap-2 group" href={"/terms-&-conditions"}><TiMinus className="text-primary group-hover:translate-x-1 transition-transform duration-200" /> Terms & Conditions</Link>
                    </nav>
                </div>

                {/* Our Services */}
                 <div className="col-span-1 md:col-span-1 lg:col-span-1">
                    <h3 className="text-primary text-xl font-bold mb-4">Our Services</h3>
                    <nav className="flex flex-col gap-2">
                        {/* Use Link for navigatable services if applicable, or keep as p */}
                        <p className="text-gray-700 font-semibold">CCTV Camera Installation</p>
                        <p className="text-gray-700 font-semibold">Upgradation of Old CCTV Systems</p>
                        <p className="text-gray-700 font-semibold">Annual Maintenance</p>
                        <p className="text-gray-700 font-semibold">Remote Monitoring </p>
                        <p className="text-gray-700 font-semibold">Mobile Integration</p>
                        <p className="text-gray-700 font-semibold">PC & Laptop Repair Services</p>
                        <p className="text-gray-700 font-semibold">Mobile Phone Servicing</p>
                        <p className="text-gray-700 font-semibold">Mobile and Laptop Accessories</p>
                    </nav>
                </div>

                {/* Contact Us */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <h3 className="text-primary text-xl font-bold mb-4">Contact Us</h3>

                    <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-8 h-8 flex justify-center items-center bg-primary/10 text-primary rounded-full">
                            <MdMyLocation className="text-lg" />
                        </div>
                        <p className="font-semibold text-gray-700 leading-relaxed">
                            Hathras, Uttar Pradesh, India
                        </p>
                    </div>

                    <a className="flex items-start gap-3 mb-4 group" href="mailto:contact@omnetworkindia.com">
                         <div className="flex-shrink-0 w-8 h-8 flex justify-center items-center bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                            <MdOutlineEmail className="text-lg" />
                        </div>
                        <p className="font-semibold text-gray-700 group-hover:text-primary transition-colors duration-200 leading-relaxed">
                            contact@omnetworkindia.com
                        </p>
                    </a>

                    <a className="flex items-start gap-3 mb-6 group" href="tel:+917017757089">
                         <div className="flex-shrink-0 w-8 h-8 flex justify-center items-center bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                            <FaPhoneAlt className="text-sm" />
                        </div>
                        <p className="font-semibold text-gray-700 group-hover:text-primary transition-colors duration-200 leading-relaxed">
                            +91 7017757089
                        </p>
                    </a>

                    {/* Social Icons */}
                    <div className="flex gap-3">
                        <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm">
                             <FaFacebookF className="text-lg" />
                        </Link>
                         <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm">
                            <GrInstagram className="text-lg" />
                        </Link>
                        <Link href="https://www.youtube.com/@omnetworkindia" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm">
                             <BsYoutube className="text-lg" />
                        </Link>
                    </div>

                </div>

            </div>

            {/* Copyright */}
            <div className="mt-16 py-5 border-t border-gray-300 text-center relative z-10">
                <p className="text-gray-700 text-sm font-semibold"> &copy; {currentYear} Om Network India | All Rights Reserved</p>
            </div>

        </footer>
    );
}


