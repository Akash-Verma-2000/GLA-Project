"use client"

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { MdOutlineLeaderboard } from "react-icons/md";

const LeadDetailsPage = () => {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeadDetails = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    setError("Unauthorized: Please login again.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`/api/leads/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                const data = await res.json();

                if (data.status === "success") {
                    setLead(data.data);
                } else {
                    setError(data.message || "Failed to fetch lead details.");
                }
            } catch (err) {
                setError("Error fetching lead details: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-lg font-medium text-primary">Loading lead details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <span className="ml-3 text-lg font-medium text-red-600">Error: {error}</span>
            </div>
        );
    }

    if (!lead) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <span className="ml-3 text-lg font-medium text-gray-600">Lead not found.</span>
            </div>
        );
    }

    return (
        <section>

            <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                <div className="flex flex-row items-center justify-center gap-1">
                    <MdOutlineLeaderboard /><h1>Lead Details</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="font-semibold text-gray-700">Name:</p>
                    <p className="text-gray-900">{lead.name}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Phone:</p>
                    <p className="text-gray-900">{lead.phone}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Email:</p>
                    <p className="text-gray-900">{lead.email}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Type:</p>
                    <span className={`px-2 py-1 text-xs border-1 ${lead.type == "Inquiry" ? "border-green-800  bg-green-100 text-green-800" : lead.type == "Complaint" ? "border-red-800  bg-red-100 text-red-800" : "border-yellow-800  bg-yellow-100 text-yellow-800"} font-semibold`}>
                        {lead.type}
                    </span>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Current Status:</p>
                    <span className={`px-2 py-1 text-xs border-1
                        ${lead.status == "New" ? "border-blue-800  bg-blue-100 text-blue-800" :
                            lead.status == "Contacted" ? "border-teal-800  bg-teal-100 text-teal-800" : lead.status == "In Progress" ? "border-orange-800  bg-orange-100 text-orange-800" :
                                lead.status == "In Progress" ? "border-orange-800  bg-orange-100 text-orange-800" :
                                    lead.status == "Proposal Sent" ? "border-purple-800  bg-purple-100 text-purple-800" :
                                        lead.status == "Converted" ? "border-green-800  bg-green-100 text-green-800" :
                                            lead.status == "Lost" ? "border-red-800  bg-red-100 text-red-800" :
                                                lead.status == "Follow-Up Scheduled" ? "border-yellow-800  bg-yellow-100 text-yellow-800" :
                                                    lead.status == "No Response" ? "border-gray-800  bg-gray-100 text-gray-800" :
                                                        lead.status == "Spam" ? "border-black-800  bg-black-100 text-black-800" :
                                                            ""} font-semibold`}>
                        {lead.status}
                    </span>
                </div>
                {lead.message && (
                    <div className="md:col-span-2">
                        <p className="font-semibold text-gray-700">Message:</p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{lead.message}</p>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Status History</h3>
            {lead.statusHistory && lead.statusHistory.length > 0 ? (
                <div className="relative pl-8">
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                    {lead.statusHistory.map((historyItem, index) => (
                        <div key={index} className="mb-4 relative">
                            <div className="absolute left-0 -ml-2 h-4 w-4 rounded-full bg-primary border-2 border-white"></div>
                            <div className="ml-6 p-3 bg-gray-50 rounded-lg shadow-sm">
                                <p className="font-semibold text-gray-800">Status: {historyItem.status}</p>
                                <p className="text-gray-500 text-sm">{new Date(historyItem.updatedAt).toLocaleString()}</p>
                                {historyItem.remark && <p className="text-gray-700">Remark: {historyItem.remark}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No status history available.</p>
            )}
        </section>
    );
};

export default LeadDetailsPage; 