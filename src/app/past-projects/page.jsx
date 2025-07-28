import ContactUsSection from "@/components/ContactUsSection";
import PageIntroSection from "@/components/PageIntro";
import PastProjectsSection from "@/components/PastProjectsSection";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "Past Projects | Om Network India",
    description: "Explore Om Network India's completed CCTV installations and security system projects across residential, commercial, and industrial locations. Proven expertise you can trust.",
    keywords: "Om Network India projects, CCTV installations, past work, completed projects, security camera setup, client portfolio, project gallery",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "Past Projects | Om Network India",
    "og:description": "See our portfolio of successfully completed CCTV and surveillance projects across homes, businesses, and institutions by Om Network India.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/past-projects",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>
            <PageIntroSection
                title={"Past Projects"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "Past Projects" }
                ]}
                description={"A showcase of successfully delivered projects, highlighting our commitment to quality, innovation, and customer satisfaction across diverse industries and client needs."}
            />
            <PastProjectsSection />
            <ContactUsSection background={"white"} />
        </WebsiteLayout>
    </>
}