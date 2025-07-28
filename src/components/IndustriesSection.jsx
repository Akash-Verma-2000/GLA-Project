import { MdBusiness, MdSchool, MdLocalHospital, MdShoppingCart, MdFactory, MdSecurity, MdHome, MdApartment } from "react-icons/md";

export default function IndustriesSection({ addIntro = true }) {

    const industries = [
        {
            title: "Commercial",
            description: "Smart and scalable security systems designed to protect offices, retail outlets, malls, and commercial buildings.",
            icon: MdBusiness,
            color: "from-blue-500 to-blue-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 border-2 border-blue-500",

        },
        {
            title: "Education",
            description: "Advanced security solutions to safeguard schools, colleges, universities, and educational campuses with round-the-clock protection.",
            icon: MdSchool,
            color: "from-green-500 to-green-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 border-2 border-green-500",
        },
        {
            title: "Healthcare",
            description: "Reliable and efficient security systems for hospitals, clinics, and medical facilities to ensure patient safety and secure operations.",
            icon: MdLocalHospital,
            color: "from-red-500 to-red-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 border-2 border-red-500",
        },
        {
            title: "Retail",
            description: "Customized security solutions for retail stores, showrooms, and shopping centers to prevent theft, monitor activity, and enhance customer safety.",
            icon: MdShoppingCart,
            color: "from-purple-500 to-purple-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 border-2 border-purple-500",
        },
        {
            title: "Manufacturing",
            description: "Robust security systems for factories, warehouses, and industrial sites to safeguard assets, monitor operations, and ensure workplace safety.",
            icon: MdFactory,
            color: "from-yellow-500 to-yellow-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 border-2 border-yellow-500",
        },
        {
            title: "Government",
            description: "High-grade security solutions for government buildings, public institutions, and critical infrastructure to ensure safety, compliance, and uninterrupted operations.",
            icon: MdSecurity,
            color: "from-indigo-500 to-indigo-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 border-2 border-indigo-500",
        },
        {
            title: "Residential",
            description: "Smart and secure surveillance systems for apartments, gated communities, and individual homes to protect families and property 24/7.",
            icon: MdHome,
            color: "from-pink-500 to-pink-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 border-2 border-pink-500",
        },
        {
            title: "Real Estate",
            description: "Integrated security solutions for residential and commercial real estate projects to enhance property value, ensure safety, and attract buyers.",
            icon: MdApartment,
            color: "from-teal-500 to-teal-600",
            class: "group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 border-2 border-teal-500",
        }
    ];

    return (
        <section className="bg-white px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">
            {addIntro && (
                <div className="mb-10">
                    <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
                        Industries We Serve
                    </h2>
                    <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
                        At Om Network India, we cater to a wide range of industries with tailored security solutions designed for every environment. From corporate offices and retail spaces to educational institutions and residential complexes, we ensure safety, reliability, and peace of mind.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {industries.map((industry, index) => (
                    <IndustryCard key={index} industry={industry} />
                ))}
            </div>
        </section>
    );
}

function IndustryCard({ industry }) {
    const Icon = industry.icon;

    return (
        <div className={industry.class}>
            <div className="flex flex-col h-full">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                    {industry.title}
                </h3>
                <p className="text-gray-600">
                    {industry.description}
                </p>
            </div>
        </div>
    );
} 