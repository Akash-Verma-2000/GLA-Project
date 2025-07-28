"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoCall } from "react-icons/io5";

export default function HeroSection() {

    const services = [
        "CCTV Installation",
        "Home Surveillance",
        "Business Security",
        "IP Camera Setup",
        "Remote Monitoring",
        "System Maintenance",
        "Video Door Phones",
        "NVR Setup",
        "DVR Setup",
        "Security Consulting",
        "Access Control",
        "Wireless Cameras",
        "Motion Alerts",
        "24/7 Monitoring",
        "System Upgrades"
    ]

    const [mounted, setMounted] = useState(false);
    const [text, setText] = useState(services[0]);
    const [serviceIndex, setServiceIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const router=useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        
        const currentService = services[serviceIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(currentService.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);

                if (charIndex + 1 === currentService.length) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                setText(currentService.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);

                if (charIndex === 0) {
                    setIsDeleting(false);
                    setServiceIndex((prev) => (prev + 1) % services.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, serviceIndex, mounted]);

    return <>
        <section className="!z-10 bg-gradient-to-b from-white to-primary/30 px-5 pt-10 pb-10 sm:px-10 sm:pt:10 sm:pb-16 md:pt-10 md:pb-10 xl:px-20 xl:py-20 border-t-4">

            <div className="grid grid-cols-3 gap-10">

                <div className="col-span-3 md:col-span-1 flex justify-center items-center flex-col">

                    <Image className="rounded-4xl"
                        src="/icons/Main-Logo.png" width={1920} height={1920} alt="Hero Image">
                    </Image>

                    <div className="flex flex-col justify-center items-center mt-5 lg:mt-10">
                        <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-2xl text-center font-semibold bg-gradient-to-r from-primary to-black bg-clip-text text-transparent lg:min-h-[3.5rem]">
                            {text}
                            <span className="animate-pulse">|</span>
                        </h2>

                        <div className="flex justify-center items-center gap-2 mt-5 lg:mt-0">
                            {services.map((_, index) => (
                                <div
                                    key={index}
                                    className={`rounded-full ${index === serviceIndex ? "bg-black w-2 h-2" : "bg-gray-400 w-2 h-2"}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>

                <div className="col-span-3 md:col-span-2 flex flex-col justify-between">

                    <div>

                        <h2 className="text-gray-800 font-bold scale-y-125 origin-top text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                            <span className="text-primary">Security </span> Starts with a Watchful Eye
                        </h2>

                        <p className="!text-gray-800 font-medium mt-10 md:mt-8 lg:mt-16 lg:mb-0">
                            We're more than CCTV installers; we're partners in protection. Our expert team works locally and remotely to deliver smart, reliable surveillance solutions. With a diverse network of professionals, we ensure fast setup, cutting-edge technology, and unmatched security for every space.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5">

                            <button className="w-full sm:w-auto" onClick={()=>{router.push("/contact-us")}}>
                                <div className="bg-secondary/50 font-semibold text-lg text-gray-800 mt-5 cursor-pointer border-secondary border-2 rounded-xl hover:bg-secondary/60 transition-all delay-100  px-8 py-3 lg:px-10 lg:py-3 hover:scale-105">
                                    <div className="flex justify-center text-white items-center gap-2">
                                        Get Started <FaArrowRight />
                                    </div>
                                </div>
                            </button>

                            <button className="w-full sm:w-auto" onClick={()=>{router.push("/services")}}>
                                <div className="bg-primary/50 font-semibold text-lg text-gray-800 sm:mt-5 cursor-pointer border-primary border-2 rounded-xl hover:bg-primary/60 transition-all delay-100  px-8 py-3 lg:px-10 lg:py-3 hover:scale-105">
                                    <div className="flex justify-center items-center gap-2">
                                        Explore Services
                                    </div>
                                </div>
                            </button>

                        </div>

                        <div className="flex lg:flex-row gap-5 -mt-5">

                            <a href="tel:+917017757089" className="bg-primary/50 font-semibold text-lg text-gray-800 mt-10 cursor-pointer border-primary border-2 rounded-xl hover:bg-primary/60 transition-all delay-100 px-3.5 py-3.5 hover:scale-105">

                                <div className="relative z-10">
                                    <IoCall className="text-2xl" />
                                </div>

                            </a>

                            <a href="mailto:contact@omnetworkindia.com" className="bg-primary/50 font-semibold text-lg text-gray-800 mt-10 cursor-pointer border-primary border-2 rounded-xl hover:bg-primary/60 transition-all delay-100 px-3.5 py-3.5 hover:scale-105">

                                <div className="relative z-10">
                                    <HiOutlineMail className="text-2xl font-bold" />
                                </div>

                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    </>
}






