import { MdMyLocation, MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import PageIntroSection from "@/components/PageIntro";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "Terms and Conditions | Om Network India",
    description: "Read the terms and conditions for using Om Network India's website and CCTV security services. Understand your rights, responsibilities, and our service policies.",
    keywords: "terms and conditions, Om Network India terms, CCTV service agreement, user responsibilities, service policies, legal terms, usage guidelines",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "Terms and Conditions | Om Network India",
    "og:description": "By accessing and using our website and CCTV services, you agree to the terms outlined by Om Network India. Read the full terms and conditions here.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/terms-&-conditions",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>

            <PageIntroSection
                title={"Terms & Conditions"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "Terms & Conditions" }
                ]}
                description={"By using our services, you agree to the terms outlined here, which define your rights, responsibilities, and the rules governing our platform."}
            />

            <section className="my-10 lg:my-20 mx-5 sm:mx-10 md:mx-20">
                <h2 className="text-xl font-bold mb-3 text-black">1. Introduction</h2>
                <p className=" !text-gray-600">Welcome to Om Network India. By accessing and using our website or services, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">2. Use of Our Services</h2>
                <p className=" !text-gray-600">You agree to use our services only for lawful purposes and not to misuse, harm, or disrupt our systems or service infrastructure.</p>
                <ul className="list-disc text-tertiary pl-5">
                    <li className=" !text-gray-600">You must be at least 18 years old to use our services.</li>
                    <li className=" !text-gray-600">You will not engage in fraudulent, abusive, or illegal activity using our services.</li>
                    <li className=" !text-gray-600">You are responsible for maintaining the confidentiality of your account information.</li>
                </ul>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">3. Service Bookings & Payments</h2>
                <p className=" !text-gray-600">All bookings must be made via our official channels. Payments are to be made through approved methods and are non-refundable unless explicitly mentioned.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">4. Installation & Equipment</h2>
                <p className=" !text-gray-600">Om Network India installs and configures CCTV systems professionally. Clients must ensure a suitable environment and electrical support for installation. Equipment warranty is subject to manufacturer terms.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">5. Intellectual Property</h2>
                <p className=" !text-gray-600">All content, logos, graphics, and materials on this website are the property of Om Network India and are protected under applicable copyright laws.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">6. Limitation of Liability</h2>
                <p className=" !text-gray-600">We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services, website, or failure to deliver as a result of events beyond our control.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">7. Privacy</h2>
                <p>Your use of our services is also governed by our Privacy Policy. Please refer to it to understand how we collect, store, and use your data.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">8. Third-Party Links</h2>
                <p className=" !text-gray-600">Our website may contain links to third-party sites. Om Network India is not responsible for the content, accuracy, or practices of any linked website.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">9. Termination</h2>
                <p className=" !text-gray-600">We reserve the right to terminate or suspend your access to our services or website without prior notice for violation of these terms.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">10. Changes to Terms</h2>
                <p className=" !text-gray-600">Om Network India may update or revise these Terms and Conditions at any time. Any updates will be reflected on this page with a new effective date.</p>

                <h2 className="text-xl mt-6 font-bold mb-3 text-black">11. Effective Date</h2>
                <p className=" !text-gray-600">16 May 2025</p>


                <div className="col-span-4 md:col-span-2 lg:col-span-1">
                    <h2 className="text-xl font-bold mb-3 mt-6">10. Contact Us</h2>

                    <div className="flex items-center gap-1 mb-2">

                        <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                            <MdMyLocation />
                        </div>

                        <p className="font-semibold !text-gray-600">Hathras, Uttar Pradesh, India</p>

                    </div>

                    <a className="flex items-center mb-2" href="mailto:contact@omnetworkindia.com">

                        <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                            <MdOutlineEmail className="font-semibold text-xl" />
                        </div>

                        <p className="font-semibold !text-gray-600">contact@omnetworkindia.com</p>

                    </a>

                    <a className="flex items-center mb-4" href="tel:+917017757089">

                        <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                            <FaPhoneAlt />
                        </div>

                        <p className="font-semibold !text-gray-600">+91 7017757089</p>

                    </a>

                    <div className="flex">

                        <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                            <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer">
                                <span className="text-black"><FaFacebookF /></span>
                            </Link>
                        </div>

                        <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                            <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer">
                                <span className="text-black"><GrInstagram /></span>
                            </Link>
                        </div>

                        <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                            <Link href="https://www.youtube.com/@omnetworkindia" target="_blank" rel="noopener noreferrer">
                                <span className="text-black"><BsYoutube /></span>
                            </Link>
                        </div>

                    </div>

                </div>

            </section>
        </WebsiteLayout>
    </>
}