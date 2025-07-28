import ContactUsSection from "@/components/ContactUsSection";
import PageIntroSection from "@/components/PageIntro";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "Contact Us | Om Network India",
    description: "Get in touch with Om Network India for CCTV installation, maintenance, repairs, and other tech services. We're here to help you with expert solutions and support.",
    keywords: "contact Om Network India, CCTV support, get in touch, customer service, technical support, CCTV queries, service booking, address, phone, email",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "Contact Us | Om Network India",
    "og:description": "Need CCTV services or tech support? Contact Om Network India today via phone, email, or visit us to discuss your security and technology needs.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/contact-us",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>
            <PageIntroSection
                title={"Contact Us"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" }
                ]}
                description={"Get in touch for reliable security solutions backed by expert guidance and personalized support."}
            />
            <ContactUsSection background={"white"} />
        </WebsiteLayout>
    </>
}