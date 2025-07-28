import ContactUsSection from "@/components/ContactUsSection";
import FaqSection from "@/components/FaqSection";
import PageIntroSection from "@/components/PageIntro";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
    title: "FAQs | Om Network India",
    description: "Find answers to the most frequently asked questions about our CCTV installation, maintenance, pricing, warranty, and support services at Om Network India.",
    keywords: "Om Network India FAQs, CCTV questions, camera installation help, surveillance support, security system queries, customer support",
    author: "Om Network India",
    robots: "index, follow",
    "og:title": "FAQs | Om Network India",
    "og:description": "Have questions about our CCTV and security services? Explore Om Network India’s FAQ page for quick answers and detailed support information.",
    image: "/images/OG-Image.jpg",
    "og:url": "https://omnetworkindia.com/faqs",
    "og:type": "website"
};

export default function Page() {
    return <>
        <WebsiteLayout>
            <PageIntroSection
                title={"Frequently Asked Questions"}
                routes={[
                    { label: "Home", href: "/" },
                    { label: "Frequently Asked Questions" }
                ]}
                description={"Get quick answers to common questions about our security services, installation, pricing, and ongoing support."}
            />

            <FaqSection addIntro={false} limitFaq={10} />
            <ContactUsSection />
        </WebsiteLayout>
    </>
}