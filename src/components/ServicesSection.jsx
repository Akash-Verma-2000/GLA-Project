import { LuCctv, LuLayoutGrid } from "react-icons/lu";
import { MdUpdate, MdMobileFriendly } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { HiSignal } from "react-icons/hi2";
import { GiAutoRepair } from "react-icons/gi";
import { TbDeviceMobileCog } from "react-icons/tb";

export default function ServicesSection({ addIntro = true }) {

    const services = [
        {
            title: "CCTV Camera Installation",
            description: "Secure your home or business with professional CCTV camera installation from Om Network India. We provide high-quality surveillance systems, expert setup, and reliable support to ensure round-the-clock safety and peace of mind.",
            Icon: LuCctv
        },
        {
            title: "Upgradation of Old CCTV Systems",
            description: "Upgrade your old CCTV system with high-definition cameras, smarter storage, and enhanced remote access. Enjoy clearer footage and improved security without replacing your entire setup.",
            Icon: MdUpdate
        },
        {
            title: "Annual Maintenance",
            description: "Keep your surveillance systems running smoothly year-round with our Annual Maintenance service. We offer regular checkups, timely repairs, and system optimization to ensure uninterrupted security.",
            Icon: BsGear
        },
        {
            title: "Remote Monitoring",
            description: "Monitor your CCTV footage from anywhere, anytime. Our remote monitoring solutions provide real-time access and alerts, ensuring your property stays secure even when you’re away.",
            Icon: HiSignal
        },
        {
            title: "Mobile Integration",
            description: "Access your CCTV system on the go. We integrate surveillance with mobile apps, allowing you to view live footage, receive alerts, and control settings right from your smartphone.",
            Icon: MdMobileFriendly
        },
        {
            title: "PC & Laptop Repair Services",
            description: "Fast and reliable repairs for PCs and laptops. From hardware issues to software glitches, our expert technicians ensure your devices run smoothly and efficiently.",
            Icon: GiAutoRepair
        },
        {
            title: "Mobile Phone Servicing",
            description: "Expert repairs and maintenance to keep your phone in top condition. Quick, reliable, and affordable solutions for screen repairs, battery replacements, and more.",
            Icon: TbDeviceMobileCog
        },
        {
            title: "Mobile and Laptop Accessories",
            description: "Top-quality mobile and laptop accessories to enhance your device experience. From stylish cases to essential chargers and more, find everything you need to complement your tech.",
            Icon: LuLayoutGrid
        },
    ];

    return (
        <section className="bg-gray-100 px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">

            {addIntro ?

                <div className="mb-10">
                    <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-top">Our Services</h2>
                    <p className="text-md text-center !text-gray-800 text-sm md:text-md lg:text-lg">
                        Om Network India offers expert CCTV camera installations, mobile and laptop repairs, and a wide range of accessories for phones and computers. Whether you need advanced security solutions or fast, reliable gadget repairs, we are your trusted local tech partner.
                    </p>
                </div> : null
            }

            <div className="grid grid-cols-4 gap-5">

                {
                    services.map(elem => {
                        return <ServiceCard
                            title={elem.title}
                            key={elem.title}
                            description={elem.description}
                            Icon={elem.Icon}
                        />

                    })
                }

            </div>

        </section>
    );
}

function ServiceCard({ title, description, Icon }) {
    return (
        <div className="col-span-4 sm:col-span-2 lg:col-span-1 bg-white shadow-xl rounded-4xl px-5 py-10 flex flex-col items-center justify-between group transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-fit flex flex-col items-center">
                <div className="text-6xl text-white mb-5 rounded-full p-5 bg-gradient-to-r from-primary to-blue-900 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                </div>
                <h3 className="text-xl font-bold text-center text-primary scale-y-125 origin-top mb-5">{title}</h3>
                <p className="text-gray-600 text-center">{description}</p>
            </div>

            <a href="tel:+917017757089" className="bg-primary w-full p-2 rounded-lg mt-10 flex justify-center">
                <span className="text-white font-semibold">More Info</span>
            </a>

            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary transition duration-300 pointer-events-none"></div>
          
        </div>
    );
}

