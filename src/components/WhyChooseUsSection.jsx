import { MdSecurity, MdSupportAgent, MdEngineering, MdDevices, MdPayments } from "react-icons/md";
import { LuCctv } from "react-icons/lu";

export default function WhyChooseUsSection({ addIntro = true }) {
    
    const reasons = [
        {
            title: "Reliable Security Solutions",
            class: "bg-green-400/10 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-green-400",
            description: "Trusted security systems with advanced technology, real-time alerts, and uninterrupted performance to ensure complete protection around the clock.",
            Icon: MdSecurity
        },
        {
            title: "24/7 Expert Support",
            class: "bg-red-400/10 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-red-400",
            description: "Round-the-clock technical assistance from trained security professionals to ensure your systems run smoothly and issues are resolved without delay.",
            Icon: MdSupportAgent
        },
        {
            title: "Experienced Technicians",
            class: "bg-blue-400/10 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-blue-400",
            description: "Skilled and certified technicians with extensive industry knowledge to provide expert installation, maintenance, and support for all your security needs.",
            Icon: MdEngineering
        },
        {
            title: "Cutting-edge Technology",
            class: "bg-yellow-400/10 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-yellow-400",
            description: "Utilizing the latest innovations and smart security solutions to deliver efficient, scalable, and future-ready protection for your property.",
            Icon: MdDevices
        },
        {
            title: "Affordable Packages",
            class: "bg-purple-400/10 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-purple-400",
            description: "Flexible and cost-effective security plans designed to fit every budget without compromising on quality or performance.",
            Icon: MdPayments
        },
        {
            title: "Branded Gadgets",
            class: "bg-orange-400/10 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group border-2 border-orange-400",
            description: "Partnering with top global brands to provide high-quality, reliable security devices that ensure long-lasting performance and peace of mind.",
            Icon: LuCctv 
        },
    ];

    return (
        <section className="bg-white px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">
            {addIntro && (
                <div className="mb-10">
                    <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
                        Why Choose Us
                    </h2>
                    <p className="text-md text-center !text-gray-800 text-sm md:text-md lg:text-lg">
                        At Om Network India, we combine cutting-edge technology with exceptional service to provide you with the best security solutions. Our commitment to quality, reliability, and customer satisfaction sets us apart.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {reasons.map((reason, index) => (
                    <ReasonCard key={index} reason={reason} />
                ))}
            </div>
        </section>
    );
}


function ReasonCard({ reason }) {
    return <>
        <div
            className={reason.class}
        >
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <reason.Icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 scale-y-125 origin-top">
                    {reason.title}
                </h3>
                <p className="text-gray-600">
                    {reason.description}
                </p>
            </div>
        </div>

    </>
}