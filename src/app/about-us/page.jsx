import ContactUsSection from "@/components/ContactUsSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import OurMissionAndVisionSection from "@/components/OurMissionAndVisionSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import OurTeamSection from "@/components/OurTeamSection";
import PageIntroSection from "@/components/PageIntro";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "About Us | Om Network India",
    description: "Om Network India is a trusted provider of CCTV camera installation and surveillance solutions. Learn about our mission, vision, values, and the team dedicated to your security.",
    keywords: "about Om Network India, CCTV company profile, security service provider, our mission, surveillance experts, trusted CCTV installers",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "About Us | Om Network India",
    "og:description": "Discover Om Network India's journey, values, and commitment to delivering reliable and affordable CCTV security solutions for homes and businesses.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/about-us",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>

            <PageIntroSection
                title={"About Us"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "About Us" }
                ]}
                description={"Om Network India delivers trusted security solutions with advanced technology and expert support for homes and businesses."}
            />

            <WhoWeAreSection />
            <OurMissionAndVisionSection />
            <WhatWeDoSection />
            <OurTeamSection />
            <ContactUsSection />
        </WebsiteLayout>
    </>
}