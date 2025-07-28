import BrandsSection from "@/components/BrandsSection";
import ContactUsSection from "@/components/ContactUsSection";
import FaqSection from "@/components/FaqSection";
import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import ServicesSection from "@/components/ServicesSection";
import StatesSection from "@/components/StatesSection";
import TestimonialSection from "@/components/TestimonialSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import WorkingProcedureSection from "@/components/WorkingProcedureSection";
import WebsiteLayout from "@/components/WebsiteLayout";

export const metadata = {
  title: "Om Network India | We Secure What Matters",
  description: "Om Network India provides expert CCTV camera installation, surveillance systems, remote monitoring, and 24/7 support for homes and businesses. Secure your property with our reliable and affordable security solutions.",
  keywords: "CCTV installation, security camera services, Om Network India, surveillance systems, remote monitoring, home security, business security, camera setup, AMC services, smart CCTV",
  author: "Om Network India",
  robots: "index, follow",
  "og:title": "Om Network India | We Secure What Matters",
  "og:description": "Expert CCTV solutions for homes, offices, and industries. From installation to maintenance, Om Network India secures your premises with the latest surveillance technology.",
  image: "/images/OG-Image.jpg",
  "og:url": "https://omnetworkindia.com",
  "og:type": "website"
};

export default function Home() {
  return (
    <WebsiteLayout>
      <HeroSection />
      <ServicesSection />
      <StatesSection />
      <WhyChooseUsSection />
      <BrandsSection />
      <IndustriesSection />
      <WorkingProcedureSection />
      {/* <TestimonialSection /> */}
      <FaqSection />
      <ContactUsSection />
    </WebsiteLayout>
  );
}
