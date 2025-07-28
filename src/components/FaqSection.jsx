"use client"

import { useEffect, useRef, useState } from "react";

export default function FaqSection({ addIntro = true, limitFaq = 5 }) {
    const [faqs, setFaqs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState(null);
    const containerRef = useRef(null);

    // const faqs = [
    //     {
    //         id: 1,
    //         question: "What areas does Om Network India provide CCTV installation services in?",
    //         answer: "Om Network India proudly serves a wide range of locations across India. Whether you're based in a residential neighborhood, a commercial area, or an industrial zone, our team is equipped to provide prompt and professional CCTV installation services. Please get in touch with us to confirm availability in your specific city or locality."
    //     },
    //     {
    //         id: 2,
    //         question: "What types of CCTV cameras do you offer?",
    //         answer:
    //             "We offer a comprehensive selection of CCTV cameras to suit different security needs, including dome cameras, bullet cameras, IP cameras, PTZ (pan-tilt-zoom) cameras, wireless systems, and night vision cameras. Our experts help you choose the most suitable system based on your property size, lighting conditions, and surveillance goals.",
    //     },
    //     {
    //         id: 3,
    //         question: "Do you offer maintenance and support services for CCTV systems?",
    //         answer: "Yes, we provide complete maintenance and support services to keep your CCTV system running smoothly over time. Our maintenance packages include regular system checks, software updates, camera cleaning, troubleshooting, and timely repairs. Our dedicated support team is always ready to assist you with any technical issues or queries you may have.",
    //     },
    //     {
    //         id: 4,
    //         question: "How can I get a quote for CCTV installation?",
    //         answer: "Getting a quote is simple and hassle-free. You can contact us via phone, WhatsApp, or through the contact form on our website. After understanding your specific requirements and surveying your location (if needed), we'll provide a detailed and competitive quotation tailored to your needs and budget.",
    //     },
    //     {
    //         id: 5,
    //         question: "Can I access my CCTV footage remotely?",
    //         answer: "Absolutely! Most of our CCTV systems come with remote viewing capabilities. You can monitor your property in real time from your smartphone, tablet, or computer using a secure app. This feature is perfect for homeowners, business owners, and property managers who need 24/7 surveillance access while away from the premises.",
    //     },
    //     {
    //         id: 6,
    //         question: "Is your CCTV equipment compatible with existing systems?",
    //         answer: "Yes, our CCTV solutions are designed with flexibility in mind. We can integrate new cameras or recording devices into your current setup, provided the existing equipment supports basic compatibility. Our technicians will evaluate your current system and recommend the best integration or upgrade options.",
    //     },
    //     {
    //         id: 7,
    //         question: "What warranty do you offer on your CCTV products?",
    //         answer: "We offer manufacturer-backed warranties on all our CCTV products, typically ranging from 1 to 3 years depending on the brand and model. Our installation services also include a service warranty, ensuring that you're covered in case of any hardware or setup-related issues during the warranty period.",
    //     },
    //     {
    //         id: 8,
    //         question: "Do you provide CCTV solutions for businesses and institutions?",
    //         answer: "Yes, we specialize in end-to-end CCTV surveillance solutions for commercial establishments, offices, schools, factories, warehouses, and other institutions. Our team customizes each system based on the layout and specific security requirements of the site to ensure optimal coverage and performance.",
    //     },
    //     {
    //         id: 9,
    //         question: "How long does the installation process take?",
    //         answer: "The duration of the installation depends on the size of the property, the number of cameras, and the complexity of the wiring and setup. Most standard residential installations are completed within a few hours, while larger or more complex commercial projects may take one to two days. We always strive to work efficiently without compromising on quality.",
    //     },
    //     {
    //         id: 10,
    //         question: "Is technical support available after installation?",
    //         answer: "Yes, Om Network India offers full technical support even after the installation is complete. Whether it's a minor issue, a system update, or a question about functionality, our support team is available via phone, email, or onsite visits. We believe in building long-term relationships with our clients through consistent after-sales service.",
    //     },
    // ];

    const fetchFaqs = async () => {
        setLoading(true);
        try {

            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limitFaq.toString(),
            });


            const res = await fetch(`/api/faq?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();

            if (data.status === "success") {
                setFaqs(data.data.faqs);
                setTotalPages(data.data.totalPages);
            }

        } catch (error) {
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchFaqs();
    }, [limitFaq, page])


    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenId(null);
            }
        }

        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-lg font-medium text-primary">Loading FAQs...</span>
            </div>
        );
    }

    if (!faqs.length && !loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <span className="ml-3 text-lg font-medium text-gray-600">FAQs not found.</span>
            </div>
        );
    }


    return (
        <section className="bg-gray-200 px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <svg width="100%" height="100%" className="opacity-10" style={{ position: 'absolute', left: 0, top: 0 }}>
                    <defs>
                        <pattern id="faq-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="#3b82f6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#faq-dots)" />
                </svg>
            </div>
            <div className="relative z-10" ref={containerRef}>
                {addIntro && (
                    <div className="mb-10">
                        <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
                            Find quick answers to common questions about our security solutions, installation process, pricing, and support services. Our FAQ section is designed to help you make informed decisions and understand how Om Network India ensures your safety with reliable and efficient systems.</p>
                    </div>
                )}
                <div className="space-y-5">
                    {faqs.map((faq) => (
                        <FAQ
                            key={faq._id}
                            faq={faq}
                            isOpen={openId === faq._id}
                            onClick={() =>
                                setOpenId((prevId) => (prevId === faq._id ? null : faq._id))
                            }
                        />
                    ))}
                </div>
            </div>

            {faqs.length && !loading ?
                <div className="flex flex-col lg:flex-row gap-5 items-center justify-center mt-10">
                  
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 text-md"
                            onClick={() => setPage(prev => prev - 1)}
                            disabled={page === 1 || loading}
                        >
                            Previous
                        </button>
                        <span className="text-sm font-semibold text-gray-700">Page {page} of {totalPages}</span>
                        <button
                            className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 text-md"
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={page === totalPages || loading}
                        >
                            Next
                        </button>
                    </div>
                </div> : null}

        </section>
    );
}

function FAQ({ faq, isOpen, onClick }) {
    return (
        <div className={`relative bg-white/80 backdrop-blur-md w-full shadow-xl rounded-2xl border-l-4 transition-all duration-300 ${isOpen ? "border-primary scale-[1.02] shadow-2xl" : "border-gray-200"} group`}>

            <button onClick={onClick} className="w-full py-5 px-5 lg:px-10 flex justify-between items-center text-left cursor-pointer focus:outline-none">

                <h3 className="text-primary text-md md:text-lg font-semibold flex items-center gap-2">
                    {faq.question}
                </h3>

                <span className="ml-4 flex items-center justify-center">
                    <span className={`inline-block w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-45' : 'bg-white text-primary'}`}>
                        <svg
                            className="w-4 h-4 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                    </span>
                </span>

            </button>

            <div className={`px-5 lg:px-10 pt-0 overflow-hidden transition-all duration-300 ease-in-out text-gray-600 ${isOpen ? "max-h-96 py-5 opacity-100" : "max-h-0 opacity-0"}`}>
                <p>{faq.answere}</p>
            </div>

        </div>
    );
}