import { MdMyLocation, MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import PageIntroSection from "@/components/PageIntro";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "Privacy Policy | Om Network India",
    description: "Learn how Om Network India collects, uses, and protects your personal information when you visit our website or use our CCTV and security services. Your privacy matters to us.",
    keywords: "Om Network India privacy policy, data protection, user privacy, CCTV services privacy, personal data, security policy, information usage",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "Privacy Policy | Om Network India",
    "og:description": "Om Network India is committed to protecting your privacy. Read our privacy policy to understand how we handle your data while offering CCTV and security solutions.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/privacy-policy",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>

            <PageIntroSection
                title={"Privacy Policy"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "Privacy Policy" }
                ]}
                description={"We value your privacy. This policy outlines how we collect, use, and protect your personal information when you interact with our services."}
            />

            <section className="my-10 lg:my-20 mx-5 sm:mx-10 md:mx-20">

                <h2 className="text-xl font-bold mb-3 text-black">1. Introduction</h2>
                <p className=" !text-gray-600">
                    Welcome to Om Network India. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, share, and safeguard your data when you interact with our website or services. By using our platform, you agree to the practices outlined here.
                </p>

                <h2 className="text-xl font-bold mb-3 mt-6">2. Information We Collect</h2>
                <p className="!text-gray-600" >We may collect the following types of data:</p>
                <ul className="list-disc pl-5">
                    <li className=" !text-gray-600"><strong className="font-bold text-black">Personal Information:</strong> Name, phone number, email address, and address provided by you during inquiries or service bookings.</li>
                    <li className=" !text-gray-600"><strong className="font-bold text-black">Device & Usage Data:</strong> IP address, browser type, device information, and browsing behavior collected automatically.</li>
                    <li className=" !text-gray-600"><strong className="font-bold text-black">Cookies & Tracking:</strong> To enhance your browsing experience and understand user interaction with our site.</li>
                </ul>

                <h2 className="text-xl font-bold mb-3 mt-6">3. How We Use Your Information</h2>
                <p className=" !text-gray-600">We use the collected data to:</p>
                <ul className="list-disc pl-5">
                    <li className=" !text-gray-600">Provide and improve services such as CCTV installation, maintenance, monitoring, and repairs.</li>
                    <li className=" !text-gray-600">Respond to customer inquiries and support requests efficiently.</li>
                    <li className=" !text-gray-600">Send updates, offers, or service reminders when permitted.</li>
                    <li className=" !text-gray-600">Enhance our website experience and ensure technical functionality.</li>
                </ul>

                <h2 className="text-xl font-bold mb-3 mt-6">4. How We Share Your Information</h2>
                <p className=" !text-gray-600">Your data is safe with us. We may only share it under these circumstances:</p>
                <ul className="list-disc pl-5">
                    <li className=" !text-gray-600"><strong className="font-bold text-black">Authorized Personnel:</strong> With team members handling service-related requests.</li>
                    <li className=" !text-gray-600"><strong className="font-bold text-black">Third-Party Tools:</strong> With trusted vendors for analytics or marketing, under strict confidentiality agreements.</li>
                    <li className=" !text-gray-600"><strong className="font-bold text-black">Legal Obligations:</strong> To comply with legal requirements or protect our rights.</li>
                </ul>

                <h2 className="text-xl font-bold mb-3 mt-6">5. Data Security</h2>
                <p className=" !text-gray-600">
                    We take security seriously. Our systems are designed to safeguard your personal data from unauthorized access. While no system is completely secure, we implement best practices to minimize risk.
                </p>

                <h2 className="text-xl font-bold mb-3 mt-6">6. Your Choices</h2>
                <p className=" !text-gray-600">You have control over your data:</p>
                <ul className="list-disc pl-5">
                    <li className=" !text-gray-600">Request access to or deletion of your personal information.</li>
                    <li className=" !text-gray-600">Opt out of promotional emails or messages anytime.</li>
                    <li className=" !text-gray-600">Disable cookies via your browser settings if you prefer.</li>
                </ul>

                <h2 className="text-xl font-bold mb-3 mt-6">7. Third-Party Links</h2>
                <p className=" !text-gray-600">
                    Our website may include links to external platforms. We are not responsible for the content or privacy policies of those websites. Please review their privacy statements individually.
                </p>

                <h2 className="text-xl font-bold mb-3 mt-6">8. Changes to This Policy</h2>
                <p className=" !text-gray-600">
                    Om Network India may revise this Privacy Policy occasionally. Any changes will be posted here with an updated date. We encourage you to review this page regularly.
                </p>

                <h2 className="text-xl font-bold mb-3 mt-6">9. Effective Date</h2>
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