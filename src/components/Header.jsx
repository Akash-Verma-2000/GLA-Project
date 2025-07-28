'use client'

import Image from "next/image";
import Link from "next/link";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

export default function Header() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset mobile active menu when drawer closes
            setMobileActiveMenu(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="sticky top-[45.5px] z-50 bg-white shadow-lg h-16 lg:h-24 flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-40 relative" ref={menuRef}>
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image
                            src={"/icons/Logo.png"}
                            height={1920}
                            width={1920}
                            alt="Company Logo"
                            className="w-52 h-auto mt-2"
                        />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <IoIosMenu size={32} />
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex text-gray-700 font-semibold transition-all delay-75 gap-3 xl:gap-8 items-center text-sm xl:text-base">
                        <li className="hover:text-primary transition-all delay-75">
                            <Link href={"/"} className="block py-2 px-1">Home</Link>
                        </li>
                        <li className="hover:text-primary transition-all delay-75">
                            <Link href={"/services"} className="block py-2 px-1">Services</Link>
                        </li>

                        <li className="hover:text-primary transition-all delay-75">
                            <Link href={"/past-projects"} className="block py-2 px-1">Past Projects</Link>
                        </li>

                        <li className="hover:text-primary transition-all delay-75">
                            <Link href={"/frequently-asked-questions"} className="block py-2 px-1">FAQs</Link>
                        </li>

                        <li className="hover:text-primary transition-all delay-75">
                            <Link href={"/about-us"} className="block py-2 px-1">About Us</Link>
                        </li>
                    </ul>
                </nav>

                <div className="hidden lg:block">
                    <Link href="/contact-us" className="bg-primary text-sm xl:text-base transition-all delay-75 hover:bg-amber-600 hover:scale-105 text-white py-2 px-4 xl:px-6 rounded-lg whitespace-nowrap">
                        Contact Us
                    </Link>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div className={`lg:hidden fixed inset-0 bg-black/50 bg-opacity-50 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMobileMenu} />
            <nav className={`lg:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[60] overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} >

                <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image
                            src={"/icons/Logo.png"}
                            height={1920}
                            width={1920}
                            alt="Company Logo"
                            className="w-52 h-auto -my-20"
                        />
                    </Link>
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 hover:text-primary transition-colors"
                        aria-label="Close menu"
                    >
                        <IoIosClose size={32} />
                    </button>
                </div>

                <ul className="flex flex-col text-gray-700 font-semibold">
                    <li className="border-b border-gray-100">
                        <Link
                            href={"/"}
                            className="block py-4 px-6 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link
                            href={"/services"}
                            className="block py-4 px-6 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Services
                        </Link>
                    </li>
                    <li className="border-b border-gray-100">
                        <Link
                            href={"/past-projects"}
                            className="block py-4 px-6 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Past Projects
                        </Link>
                    </li>

                    <li className="border-b border-gray-100">
                        <Link
                            href={"/frequently-asked-questions"}
                            className="block py-4 px-6 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            FAQs
                        </Link>
                    </li>

                    <li className="border-b border-gray-100">
                        <Link
                            href={"/about-us"}
                            className="block py-4 px-6 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </li>
                    <li className="p-6">
                        <Link href="/contact-us" className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors">
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}



