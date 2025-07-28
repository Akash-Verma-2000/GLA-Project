'use client'

import LeadsGraph from "@/components/LeadsGraph";
import { useEffect, useState } from "react";
import { MdOutlineLeaderboard } from "react-icons/md";

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState({
        totalLeads: 0,
        totalInquiry: 0,
        totalComplaint: 0,
        totalTeamMembers: 0,
        totalProjects: 0,
        totalFaqs: 0
    });
    const [statsLoading, setStatsLoading] = useState(false);
    const [leadGraphLoading, setLeadGraphLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);
    const [leadGraphError, setLeadGraphError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {

            setStatsLoading(true);
            try {
                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    setStatsError("Unauthorized: Please login again.");
                    setStatsLoading(false);
                    return;
                }

                const res = await fetch(`/api/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                const data = await res.json();

                if (data.status === "success") {
                    setDashboardData(data.data);
                } else {
                    setStatsError(data.message || "Failed to fetch FAQ details.");
                }
            } catch (err) {
                setStatsError("Error fetching FAQ details: " + err.message);
            } finally {
                setStatsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);


    if (statsLoading ) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-lg font-medium text-primary">Loading dashboard data...</span>
            </div>
        );
    }

    if (statsError ) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <span className="ml-3 text-lg font-medium text-red-600">Error: {statsError}</span>
            </div>
        );
    }

    if (!dashboardData ) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <span className="ml-3 text-lg font-medium text-gray-600">Dashboard data not found.</span>
            </div>
        );
    }

    return (
        <>
            <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                <div className="flex flex-row items-center justify-center gap-1">
                    <MdOutlineLeaderboard /><h1>Dashboard</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Dashboard cards will go here */}
                <div className="bg-green-200 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-black">Total Leads</h2>
                    <p className="text-3xl font-bold text-green-800 mt-2">{dashboardData?.totalLeads < 10 ? "0" + dashboardData?.totalLeads : dashboardData?.totalLeads}</p>
                </div>
                <div className="bg-yellow-200 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-black">Total Inquiry</h2>
                    <p className="text-3xl font-bold text-yellow-800 mt-2">{dashboardData?.totalInquiry < 10 ? "0" + dashboardData?.totalInquiry : dashboardData?.totalInquiry}</p>
                </div>
                <div className="bg-red-200 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-black">Total Complaint</h2>
                    <p className="text-3xl font-bold text-red-800 mt-2">{dashboardData?.totalComplaint < 10 ? "0" + dashboardData?.totalComplaint : dashboardData?.totalComplaint}</p>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-black">Total Team Members</h2>
                    <p className="text-3xl font-bold text-primary mt-2">{dashboardData?.totalTeamMembers < 10 ? "0" + dashboardData?.totalTeamMembers : dashboardData?.totalTeamMembers}</p>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-black">Total Projects</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardData?.totalProjects < 10 ? "0" + dashboardData?.totalProjects : dashboardData?.totalProjects}</p>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg">
                    <h2 className="text-lg font-medium text-black">Total FAQs</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardData?.totalFaqs < 10 ? "0" + dashboardData?.totalFaqs : dashboardData?.totalFaqs}</p>
                </div>
            </div>

            {/* <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="col-span1-1">

                    <div className="p-5 mb-5 h-[500px] rounded-lg  border-2 border-gray-200 mt-5">
                        <h2 className="text-2xl font-semibold">
                            Lead Types
                        </h2>
                        <p className=" text-gray-500">
                            Fractions of different types of leads
                        </p>
                        <div className=" h-[1000px] w-full overflow-x-auto box-border">
                            <LeadsGraph />
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    );
} 