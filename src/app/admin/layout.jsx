'use client'
import AdminHeader from "@/components/AdminHeader";
import AdminTopBar from "@/components/AdminTopBar";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const adminToken = sessionStorage.getItem('adminToken');
        if (!adminToken) {
            router.push('/login');
        }
    }, [pathname, router]);

    return (
        <div className="-mt-7">
            <div className="flex">
                {/* Sidebar/Drawer */}
                <div className={`lg:w-64 fixed h-screen transition-transform duration-300 ease-in-out z-20 
                    ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <AdminHeader onClose={() => setIsDrawerOpen(false)} />
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-64 min-h-screen relative">
                    <div className="fixed top-0 left-0 lg:left-64 right-0 z-10">
                        <AdminTopBar onMenuClick={() => setIsDrawerOpen(true)} />
                    </div>
                    {/* <section className=" p-5 bg-gray-200"> */}
                    <div className="pt-[105px] bg-white p-5 min-h-screen rounded-2xl">
                        {children}
                    </div>
                    {/* </section> */}
                </div>

                {/* Overlay for mobile */}
                {isDrawerOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 bg-opacity-50 z-10 lg:hidden"
                        onClick={() => setIsDrawerOpen(false)}
                    />
                )}
            </div>
        </div>
    );
} 