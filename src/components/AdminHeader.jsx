import Link from "next/link";
import Image from "next/image";
import { MdOutlineDashboard, MdOutlineLeaderboard, MdOutlinePeople } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiOutlineProject } from "react-icons/ai";
import { usePathname } from "next/navigation";

export default function AdminHeader({ onClose }) {
    const pathname = usePathname();
    return (
        <div className="h-[1000px] bg-white flex flex-col">
            {/* Logo and Close Button */}
            <div className="p-4 flex items-center justify-between h-20 ">
                <Link href="/admin/dashboard">
                    <Image
                        src="/icons/Logo.png"
                        alt="Admin Logo"
                        width={200}
                        height={200}
                        objectFit="contain"
                    />
                </Link>
                {/* Close Button for Mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden text-black hover:bg-red-600 p-2 rounded-md"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className=" flex-1 shadow-xl">
                <ul className="space-y-2 px-2">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${pathname === "/admin/dashboard" ? "bg-primary text-white font-bold" : "text-black hover:bg-primary hover:text-white"}`}
                            onClick={onClose}
                        >
                            <span className="text-2xl">
                                <MdOutlineDashboard />
                            </span>
                            <span className="ms-2">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/leads"
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${pathname === "/admin/leads" ? "bg-primary text-white font-bold" : "text-black hover:bg-primary hover:text-white"}`}
                            onClick={onClose}
                        >
                            <span className="text-2xl">
                                <MdOutlineLeaderboard />
                            </span>
                            <span className="ms-2">
                                Leads
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/team"
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${pathname === "/admin/team" ? "bg-primary text-white font-bold" : "text-black hover:bg-primary hover:text-white"}`}
                            onClick={onClose}
                        >
                            <span className="text-2xl">
                                <MdOutlinePeople />
                            </span>
                            <span className="ms-2">
                                Team
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/projects"
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${pathname === "/admin/projects" ? "bg-primary text-white font-bold" : "text-black hover:bg-primary hover:text-white"}`}
                            onClick={onClose}
                        >
                            <span className="text-2xl">
                                <AiOutlineProject />
                            </span>
                            <span className="ms-2">
                                Project
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/admin/faq"
                            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${pathname === "/admin/faq" ? "bg-primary text-white font-bold" : "text-black hover:bg-primary hover:text-white"}`}
                            onClick={onClose}
                        >
                            <span className="text-2xl">
                                <FaRegQuestionCircle />
                            </span>
                            <span className="ms-2">
                                FAQs
                            </span>
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}