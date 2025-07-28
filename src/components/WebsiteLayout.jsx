'use client';

import TopBar from "@/components/Topbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WebsiteLayout({ children }) {
    return (
        <>
            <TopBar />
            <Header />

            {children}

            <Footer />

            <Link
                href="https://wa.me/7017757089?text=Hello%20Om Network India!%20I%20want%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50"
            >

                <div className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-full shadow-lg transition duration-300 w-16 h-16 p-4 flex items-center justify-center animate-pulse hover:scale-110 hover:shadow-2xl hover:animate-none">
                    <div className="absolute inset-0 rounded-full bg-green-500 opacity-50 blur-lg animate-ping"></div>

                    <FaWhatsapp className="w-8 h-8 text-white" />

                </div>

            </Link>
        </>
    );
}