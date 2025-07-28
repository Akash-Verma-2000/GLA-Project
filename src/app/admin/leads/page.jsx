"use client"

import { RiDeleteBin7Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { GoPencil } from "react-icons/go";
import { MdOutlineLeaderboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [leadToDeleteId, setLeadToDeleteId] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [currentLead, setCurrentLead] = useState(null);
    const [editStatus, setEditStatus] = useState("");
    const [editRemark, setEditRemark] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [submittingEdit, setSubmittingEdit] = useState(false);

    const router = useRouter();

    const fetchLeads = async () => {
        setLoading(true);
        try {

            const token = sessionStorage.getItem('adminToken');
            if (!token) {
                return;
            }

            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (type) queryParams.append("type", type);
            if (status) queryParams.append("status", status);
            if (searchValue) queryParams.append("search_value", searchValue);

            const res = await fetch(`/api/leads?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();

            if (data.status === "success") {
                setLeads(data.data.leads);
                setTotalPages(data.data.totalPages);
                setTotalLeads(data.data.totalLeads);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, limit, type, status, searchValue]);

    const handleDeleteClick = (id) => {
        setShowDeleteConfirmation(true);
        setLeadToDeleteId(id);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setLeadToDeleteId(null);
    };

    const confirmDelete = async () => {
        if (leadToDeleteId) {
            try {

                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    return;
                }

                setDeleting(true);
                const res = await fetch(`/api/leads`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: leadToDeleteId }),
                });

                const data = await res.json(); // Parse the response JSON

                if (data.status === "success") {
                    toast.success('Lead deleted', { position: "top-right" });
                    fetchLeads();
                    cancelDelete();
                } else {
                    toast.error(data.message || 'Failed to delete lead.', { position: "top-right" });
                }
            } catch (error) {
            } finally {
                setDeleting(false);
            }
        }
    };

    const handleEditClick = (lead) => {
        setCurrentLead(lead);
        setEditStatus(lead.status);
        setEditRemark(lead.statusHistory[lead.statusHistory.length - 1]?.remark || "");
        setShowEditPopup(true);
    };

    const cancelEdit = () => {
        setShowEditPopup(false);
        setCurrentLead(null);
        setEditStatus("");
        setEditRemark("");
    };

    const handleEditSubmit = async () => {
        if (!currentLead) return;

        try {
            const token = sessionStorage.getItem('adminToken');
            if (!token) {
                return;
            }

            setSubmittingEdit(true);
            const res = await fetch(`/api/leads`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: currentLead._id,
                    status: editStatus,
                    remark: editRemark
                }),
            });

            const data = await res.json();

            if (data.status === "success") {
                toast.success('Lead updated', { position: "top-right" });
                fetchLeads();
                cancelEdit();
            } else {
                toast.error(data.message || 'Failed to update lead.', { position: "top-right" });
            }
        } catch (error) {
        } finally {
            setSubmittingEdit(false);
        }
    };

    const statusOptions = ['New', 'Contacted', 'In Progress', 'Proposal Sent', 'Converted', 'Lost', 'Follow-Up Scheduled', 'No Response', 'Spam'];

    const handleDetailsClick = (id) => {
        router.push(`/admin/leads/${id}`);
    };

    return (
        <>
            <section>

                <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                    <div className="flex flex-row items-center justify-center gap-1">
                        <MdOutlineLeaderboard /><h1>Lead Management</h1>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-start gap-4 mb-10">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            name=""
                            id=""
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-8"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Types</option>
                            <option value="Complaint">Complaint</option>
                            <option value="Inquiry">Inquiry</option>
                            <option value="Others">Others</option>
                        </select>

                        <select
                            name=""
                            id=""
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-8"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                            <option value="Follow-Up Scheduled">Follow-Up Scheduled</option>
                            <option value="No Response">No Response</option>
                            <option value="Spam">Spam</option>
                        </select>
                    </div>
                </div>

                <div className="hidden lg:block">

                    {loading ?
                        <div className="flex items-center justify-center min-h-screen pb-[250px]">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                            <span className="ml-3 text-lg font-medium text-primary">Loading leads...</span>
                        </div> : null}

                    {leads.length === 0 && !loading ?
                        < div className="flex items-center justify-center min-h-screen pb-[250px]">
                            <div className="text-center py-4 text-lg font-semibold text-red-500">No leads found.</div>
                        </div> : null}

                    {leads.length && !loading ?
                        <table className="w-full text-left border-collapse mb-5">
                            <thead className="bg-gray-200 text-sm uppercase">
                                <tr>
                                    <th className="px-4 py-2">S.N.</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Phone</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Time</th>
                                    <th className="px-4 py-2">Type</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">

                                {leads.map((lead, index) => (
                                    <tr key={lead._id} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="px-4 py-3 border-b border-gray-200">{index + 1 < 10 ? "0" + Number(index + 1) : index + 1}.</td>
                                        <td className="px-4 py-3 border-b border-gray-200">{lead.name}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">{lead.phone}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">{lead.email}</td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            {new Date(lead.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            <button className={`px-2 py-1 text-xs border-1 ${lead.type == "Inquiry" ? "border-green-800  bg-green-100 text-green-800" : lead.type == "Complaint" ? "border-red-800  bg-red-100 text-red-800" : "border-yellow-800  bg-yellow-100 text-yellow-800"} font-semibold`}>
                                                {lead.type}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            <button className={`px-2 py-1 text-xs border-1
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
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="text-lg text-red-800 border-2 border-red-800 p-1 hover:bg-red-200  cursor-pointer"
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(lead._id)}
                                                >
                                                    <RiDeleteBin7Line />
                                                </span>
                                                <span className="text-lg text-blue-800 border-2 border-blue-800 p-1 hover:bg-blue-200  cursor-pointer" title="Details"
                                                    onClick={() => handleDetailsClick(lead._id)}
                                                >
                                                    <TbListDetails />
                                                </span>
                                                <span className="text-lg text-purple-800 border-2 border-purple-800 p-1 hover:bg-purple-200  cursor-pointer" title="Edit"
                                                    onClick={() => handleEditClick(lead)}
                                                >
                                                    <GoPencil />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : null}

                </div>

                <div className="lg:hidden">

                    {loading ?
                        <div className="flex items-center justify-center min-h-screen pb-[250px]">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                            <span className="ml-3 text-lg font-medium text-primary">Loading leads...</span>
                        </div> : null}

                    {leads.length === 0 && !loading ?
                        < div className="flex items-center justify-center min-h-screen pb-[250px]">
                            <div className="text-center py-4 text-lg font-semibold text-red-500">No leads found.</div>
                        </div> : null}

                    {leads.length && !loading ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {leads.map((lead, index) => {

                                return <>
                                    <div key={index} className="border rounded-md border-gray-300 p-5">
                                        <h2 className="font-semibold text-xl">{lead?.name}</h2>
                                        <p className="text-gray-600"><span className="font-semibold text-black">Phone:</span> {lead?.phone}</p>
                                        <p className="text-gray-600"><span className="font-semibold text-black">Email:</span> {lead?.email}</p>
                                        <p className="text-gray-600"><span className="font-semibold text-black">Time:</span> {new Date(lead?.createdAt).toLocaleString()}</p>
                                        <div className="flex justify-between mt-5">
                                            <div className="flex gap-2">
                                                <button className={`px-2 py-1 text-xs border-1 ${lead?.type == "Inquiry" ? "border-green-800  bg-green-100 text-green-800" : lead?.type == "Complaint" ? "border-red-800  bg-red-100 text-red-800" : "border-yellow-800  bg-yellow-100 text-yellow-800"} font-semibold`}>
                                                    Inquiry
                                                </button>
                                                <button className={`px-2 py-1 text-xs border-1
                                                     ${lead?.status == "New" ? "border-blue-800  bg-blue-100 text-blue-800" :
                                                        lead?.status == "Contacted" ? "border-teal-800  bg-teal-100 text-teal-800" : lead?.status == "In Progress" ? "border-orange-800  bg-orange-100 text-orange-800" :
                                                            lead?.status == "In Progress" ? "border-orange-800  bg-orange-100 text-orange-800" :
                                                                lead?.status == "Proposal Sent" ? "border-purple-800  bg-purple-100 text-purple-800" :
                                                                    lead?.status == "Converted" ? "border-green-800  bg-green-100 text-green-800" :
                                                                        lead?.status == "Lost" ? "border-red-800  bg-red-100 text-red-800" :
                                                                            lead?.status == "Follow-Up Scheduled" ? "border-yellow-800  bg-yellow-100 text-yellow-800" :
                                                                                lead?.status == "No Response" ? "border-gray-800  bg-gray-100 text-gray-800" :
                                                                                    lead?.status == "Spam" ? "border-black-800  bg-black-100 text-black-800" :



                                                                                        ""} font-semibold`}>
                                                    {lead?.status}
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className="text-lg text-red-800 border-2 border-red-800 p-1 hover:bg-red-200  cursor-pointer"
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(lead?._id)}
                                                >
                                                    <RiDeleteBin7Line />
                                                </button>
                                                <button className="text-lg text-blue-800 border-2 border-blue-800 p-1 hover:bg-blue-200  cursor-pointer" title="Details"
                                                    onClick={() => handleDetailsClick(lead?._id)}
                                                >
                                                    <TbListDetails />
                                                </button>
                                                <button className="text-lg text-purple-800 border-2 border-purple-800 p-1 hover:bg-purple-200  cursor-pointer" title="Edit"
                                                    onClick={() => handleEditClick(lead)}
                                                >
                                                    <GoPencil />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            })}

                        </div> : null}

                </div>

                {leads.length && !loading ?
                    <div className="flex flex-col lg:flex-row gap-5 items-center justify-between m-5">

                        <div className="flex items-center gap-2">
                            <label htmlFor="rowsPerPage" className="text-sm text-gray-700">Rows per page:</label>
                            <select
                                name="rowsPerPage"
                                id="rowsPerPage"
                                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={limit}
                                onChange={(e) => {
                                    setLimit(parseInt(e.target.value));
                                    setPage(1);
                                }}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <span className="text-sm text-gray-700 hidden lg:block">
                            {(page - 1) * limit + 1} to {Math.min(page * limit, totalLeads)} of {totalLeads} Leads
                        </span>
                        <div className="flex items-center gap-4">

                            <button
                                className="bg-gray-200 cursor-pointer text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 text-md"
                                onClick={() => setPage(prev => prev - 1)}
                                disabled={page === 1 || loading}
                            >
                                Previous
                            </button>
                            <span className="text-sm font-semibold text-gray-700">Page {page} of {totalPages}</span>
                            <button
                                className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 text-md"
                                onClick={() => setPage(prev => prev + 1)}
                                disabled={page === totalPages || loading}
                            >
                                Next
                            </button>
                        </div>

                    </div> : null}

            </section >

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg m-5">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">Are you sure you want to delete this lead?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={cancelDelete}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={confirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <span className="flex gap-1 items-center">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditPopup && currentLead && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Edit Lead Status</h2>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                id="status"
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-8"
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                            >
                                {statusOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                            <textarea
                                id="remark"
                                rows="4"
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={editRemark}
                                onChange={(e) => setEditRemark(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-300 cursor-pointer text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={cancelEdit}
                                disabled={submittingEdit}
                            >
                                Cancel
                            </button>
                            <button
                                className={`cursor-pointer text-white px-4 py-2 rounded-md ${!currentLead || (editStatus === currentLead.status && editRemark === (currentLead.statusHistory[currentLead.statusHistory.length - 1]?.remark || "")) || submittingEdit ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'}`}
                                onClick={handleEditSubmit}
                                disabled={!currentLead || (editStatus === currentLead.status && editRemark === (currentLead.statusHistory[currentLead.statusHistory.length - 1]?.remark || "")) || submittingEdit}
                            >
                                {submittingEdit ? (
                                    <span className="flex gap-1 items-center">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        "Submitting..."
                                    </span>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LeadsPage;