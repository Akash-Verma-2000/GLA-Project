"use client"

import { RiDeleteBin7Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { MdOutlineLeaderboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const FaqPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalFaqs, setTotalFaqs] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [faqToDeleteId, setFaqToDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const fetchFaqs = async () => {
        setLoading(true);
        try {

            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (searchValue) queryParams.append("search_value", searchValue);

            const res = await fetch(`/api/faq?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();

            if (data.status === "success") {
                setFaqs(data.data.faqs);
                setTotalPages(data.data.totalPages);
                setTotalFaqs(data.data.totalFaq);
            }

        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, [page, limit, searchValue]);

    const handleDeleteClick = (id) => {
        setShowDeleteConfirmation(true);
        setFaqToDeleteId(id);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setFaqToDeleteId(null);
    };

    const confirmDelete = async () => {
        if (faqToDeleteId) {
            try {

                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    return;
                }

                setDeleting(true);
                const res = await fetch(`/api/faq`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: faqToDeleteId }),
                });

                const data = await res.json();

                if (data.status === "success") {
                    toast.success('FAQ deleted', { position: "top-right" });
                    fetchFaqs();
                    cancelDelete();
                } else {
                    toast.error(data.message || 'Failed to delete FAQ.', { position: "top-right" });
                }
            } catch (error) {
            } finally {
                setDeleting(false);
            }
        }
    };


    return (
        <>
            <section>

                <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                    <div className="flex flex-row items-center justify-center gap-1">
                        <MdOutlineLeaderboard /><h1>FAQs Management</h1>
                    </div>
                </div>

                <div className="grid grid-cols-10 items-center justify-start gap-4 mb-10">
                    <div className="col-span-10 md:col-span-7 xl:col-span-8">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <button className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 text-md col-span-10 md:col-span-3 xl:col-span-2" onClick={() => { router.push("/admin/faq/create") }} >
                        Add FAQ
                    </button>
                </div>


                <div>

                    {loading ?
                        <div className="flex items-center justify-center min-h-screen pb-[250px]">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                            <span className="ml-3 text-lg font-medium text-primary">Loading FAQs...</span>
                        </div> : null}

                    {faqs.length === 0 && !loading ?
                        < div className="flex items-center justify-center min-h-screen pb-[250px]">
                            <div className="text-center py-4 text-lg font-semibold text-red-500">No FAQs found.</div>
                        </div> : null}

                    {faqs.length && !loading ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {faqs.map((faq, index) => {

                                return <>
                                    <div key={index} className="border rounded-md flex flex-col justify-between border-gray-300 p-5">

                                        <div>
                                            <p className="font-semibold text-black">{faq.question}</p>
                                            <p className="text-gray-600">{faq.answere}</p>
                                        </div>

                                        <div className="flex justify-between items-center gap-2 mt-5">
                                            <p className="text-gray-600"><span className="font-semibold text-black">S No:</span> {faq?.sno < 10 ? "0" + faq?.sno : faq?.sno}</p>

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    className="text-lg text-red-800 border-2 border-red-800 p-1 hover:bg-red-200  cursor-pointer"
                                                    title="Delete"
                                                    onClick={() => handleDeleteClick(faq?._id)}
                                                >
                                                    <RiDeleteBin7Line />
                                                </button>
                                                <button className="text-lg text-purple-800 border-2 border-purple-800 p-1 hover:bg-purple-200  cursor-pointer" title="Edit"
                                                    onClick={() => {router.push(`/admin/faq/${faq._id}`) }}
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

                {faqs.length && !loading ?
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
                            {(page - 1) * limit + 1} to {Math.min(page * limit, totalFaqs)} of {totalFaqs} FAQs
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
        </>
    );
};

export default FaqPage;