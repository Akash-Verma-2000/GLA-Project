'use client'

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { MdMyLocation, MdOutlineEmail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUsSection({ background = 'gray-100' }) {
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const typeOptions = [
        { value: "Inquiry", label: "Inquiry" },
        { value: "Complaint", label: "Complaint" },
        { value: "Others", label: "Others" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        type: "Inquiry"
    });

    const [validateFormData, setValidateFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
        type: ""
    });

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function checkFormData() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!formData.name) {
            setValidateFormData((prev) => ({ ...prev, name: "Name is required" }));
            isValid = false;
        }

        if (!formData.phone) {
            setValidateFormData((prev) => ({ ...prev, phone: "Phone is required" }));
            isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
            setValidateFormData((prev) => ({ ...prev, phone: "Invalid phone number" }));
            isValid = false;
        }

        if (!formData.email) {
            setValidateFormData((prev) => ({ ...prev, email: "Email is required" }));
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            setValidateFormData((prev) => ({ ...prev, email: "Invalid email address" }));
            isValid = false;
        }

        if (!formData.type) {
            setValidateFormData((prev) => ({ ...prev, type: "Type is required" }));
            isValid = false;
        }

        return isValid;
    }

    async function submitFormData() {
        const validationResult = checkFormData();
        if (!validationResult) {
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/leads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setLoading(false);
            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }
            toast.success("Request submitted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setFormData({ name: "", phone: "", email: "", message: "", type: "Inquiry" });
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <section className={`bg-${background} px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20`}>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">

                    {/* Left Side - Form */}
                    <div className="relative col-span-2 lg:col-span-1 h-full">

                        <div className="relative bg-gray-200 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 h-full">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                                <div className="space-y-2">
                                    <label className="block text-black text-sm sm:text-base font-semibold" htmlFor="name">
                                        Name <span className="text-red-500 text-sm">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, name: e.target.value }));
                                            setValidateFormData((prev) => ({ ...prev, name: "" }));
                                        }}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-primary/50 rounded-lg sm:rounded-xl text-black text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
                                        placeholder="Enter your name"
                                    />
                                    {validateFormData.name && (<p className="text-red-500 absolute text-xs sm:text-sm">{validateFormData.name}</p>)}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-black text-sm sm:text-base font-semibold" htmlFor="phone">
                                        Phone <span className="text-red-500 text-sm">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, phone: e.target.value }));
                                            setValidateFormData((prev) => ({ ...prev, phone: "" }));
                                        }}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-primary/50 rounded-lg sm:rounded-xl text-black text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
                                        placeholder="Enter your phone number"
                                    />
                                    {validateFormData.phone && (<p className="text-red-500 text-xs sm:text-sm">{validateFormData.phone}</p>)}
                                </div>

                                <div className="col-span-1 sm:col-span-2 space-y-2">
                                    <label className="block text-black text-sm sm:text-base font-semibold" htmlFor="email">
                                        Email <span className="text-red-500 text-sm">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                                            setValidateFormData((prev) => ({ ...prev, email: "" }));
                                        }}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-primary/50 rounded-lg sm:rounded-xl text-black text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
                                        placeholder="Enter your email"
                                    />
                                    {validateFormData.email && (<p className="text-red-500 text-xs sm:text-sm">{validateFormData.email}</p>)}
                                </div>

                                <div className="col-span-1 sm:col-span-2 space-y-2 relative">
                                    <label className="block text-black text-sm sm:text-base font-semibold" htmlFor="type">
                                        Type <span className="text-red-500 text-sm">*</span>
                                    </label>
                                    <div ref={dropdownRef} className="relative">
                                        <button
                                            type="button"
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 ${validateFormData.type ? 'border-red-500' : 'border-primary/50'} rounded-lg sm:rounded-xl text-left text-black text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300 flex items-center justify-between`}
                                            onClick={() => setDropdownOpen((open) => !open)}
                                        >
                                            <span>{typeOptions.find(opt => opt.value === formData.type)?.label || "Select type"}</span>
                                            <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {dropdownOpen && (
                                            <ul className="absolute z-10 mt-1 w-full bg-white border-2 border-primary/50 rounded-lg sm:rounded-xl shadow-lg max-h-48 overflow-auto">
                                                {typeOptions.map(option => (
                                                    <li
                                                        key={option.value}
                                                        className={`px-4 py-2 cursor-pointer hover:bg-primary/10 text-black text-sm sm:text-base ${formData.type === option.value ? 'bg-primary/10 font-semibold' : ''}`}
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, type: option.value }));
                                                            setValidateFormData(prev => ({ ...prev, type: "" }));
                                                            setDropdownOpen(false);
                                                        }}
                                                    >
                                                        {option.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {validateFormData.type && (<p className="text-red-500 text-xs sm:text-sm">{validateFormData.type}</p>)}
                                </div>

                                <div className="col-span-1 sm:col-span-2 space-y-2">
                                    <label className="block text-black text-sm sm:text-base font-semibold" htmlFor="message">
                                        Message <span className="text-gray-800 text-sm">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData((prev) => ({ ...prev, message: e.target.value }));
                                            setValidateFormData((prev) => ({ ...prev, message: "" }));
                                        }}
                                        rows="4"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-primary/50 rounded-lg sm:rounded-xl text-black text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
                                        placeholder="Your message here..."
                                    >
                                    </textarea>
                                </div>

                                <div className="col-span-1 sm:col-span-2">

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            submitFormData(formData);
                                        }}
                                        disabled={loading}
                                        className="w-full cursor-pointer group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold overflow-hidden rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-blue-900"></div>
                                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#00fca8_0%,transparent_50%)] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        <div className="relative z-10 flex items-center">

                                            {loading ? (
                                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : null}

                                            <span className="text-white font-bold">Get Free Consultation</span>
                                        </div>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="relative col-span-2 lg:col-span-1 h-full">
                        <div className="relative bg-gray-200 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 h-full">
                            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">
                                Enhance Security with<span className="text-primary"> Om Network India</span>
                            </h3>

                            <div className="space-y-4 sm:space-y-6">

                                <div className="flex items-center space-x-4 group">
                                    <div className="p-2 sm:p-3 rounded-lg bg-primary/15 border-2 border-primary/50 group-hover:border-primary transition-colors duration-300">
                                        <MdMyLocation className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-black text-sm sm:text-base font-semibold">Location</h4>
                                        <p className="text-black text-sm sm:text-base">Hathras, Uttar Pradesh, India</p>
                                    </div>
                                </div>

                                <a href="mailto:contact@omnetworkindia.com" className="flex items-center space-x-4 group">
                                    <div className="p-2 sm:p-3 rounded-lg bg-primary/15 border-2 border-primary/50 group-hover:border-primary transition-colors duration-300">
                                        <MdOutlineEmail className="font-semibold text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-black text-sm sm:text-base font-semibold">Email</h4>
                                        <p className="text-black group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
                                            contact@omnetworkindia.com
                                        </p>
                                    </div>
                                </a>

                                <a href="tel:+917017757089" className="flex items-center space-x-4 group">
                                    <div className="p-2 sm:p-3 rounded-lg bg-primary/15 border-2 border-primary/50 group-hover:border-primary transition-colors duration-300">
                                        <FaPhoneAlt className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-black text-sm sm:text-base font-semibold">Phone</h4>
                                        <p className="text-black group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
                                            +91 7017757089
                                        </p>
                                    </div>
                                </a>

                            </div>

                            <div className="mt-6 sm:mt-8">

                                <h4 className="text-black text-sm sm:text-base font-medium mb-3 sm:mb-4">Connect With Us</h4>
                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-lg bg-primary/15 border-2 border-primary/50 hover:border-primary transition-colors duration-300">
                                        <FaFacebookF className="text-primary" />
                                    </Link>
                                    <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-lg bg-primary/15 border-2 border-primary/50 hover:border-primary transition-colors duration-300">
                                        <GrInstagram className="text-primary" />
                                    </Link>
                                    <Link href="https://www.youtube.com/@omnetworkindia" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-lg bg-primary/15 border-2 border-primary/50 hover:border-primary transition-colors duration-300">
                                        <BsYoutube className="text-primary" />
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}