import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminTopBar({ onMenuClick }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            const data = await res.json();

            if (data.status === "success") {
                toast.success("Logout successfully!");
                router.push("/login");
            } else {
                toast.error(data.message || "Failed to logout.");
            }

        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" shadow-b-md p-4 flex justify-between items-center h-20  bg-white shadow-xl">
            {/* Menu Button for Mobile */}
            <button
                onClick={onMenuClick}
                className="lg:hidden flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {loading ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
} 