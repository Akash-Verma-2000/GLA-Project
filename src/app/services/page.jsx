import ContactUsSection from "@/components/ContactUsSection";
import PageIntroSection from "@/components/PageIntro";
import ServicesSection from "@/components/ServicesSection";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "Our Services | Om Network India",
    description: "Om Network India offers expert CCTV Camera Installation, System Upgradation, Annual Maintenance, Remote Monitoring, Mobile Integration, as well as PC, Laptop, and Mobile Repair Services with genuine accessories.",
    keywords: "CCTV installation, CCTV upgradation, AMC, remote monitoring, mobile integration, laptop repair, PC servicing, mobile phone repair, accessories, Om Network India services, security systems",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "Our Services | Om Network India",
    "og:description": "Explore the full range of services offered by Om Network India — from CCTV solutions to PC & mobile repair and accessories. Reliable, professional, and affordable services for every need.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/services",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>
            <PageIntroSection
                title={"Services"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "Services" }
                ]}
                description={"Trusted security services tailored to protect homes, businesses, and institutions with advanced technology and expert support."}
            />
            <ServicesSection addIntro={false} />
            <ContactUsSection background={"white"} />
        </WebsiteLayout>
    </>
}