"use client"

import { useEffect, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

const FaqNewForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [faq, setFaq] = useState({
        sno: '',
        question: '',
        answere: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchFaqDetails = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    setError("Unauthorized: Please login again.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`/api/faq/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                const data = await res.json();

                if (data.status === "success") {
                    setFaq(data.data);
                } else {
                    setError(data.message || "Failed to fetch FAQ details.");
                }
            } catch (err) {
                setError("Error fetching FAQ details: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaq(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = sessionStorage.getItem('adminToken');

            if (!token) {
                toast.error("Unauthorized: Please login again.");
                setSubmitting(false);
                return;
            }

            const res = await fetch(`/api/faq`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(faq),
            });

            const data = await res.json();

            if (data.status === "success") {
                toast.success("FAQ add successfully!");
                router.push("/admin/faq");
            } else {
                toast.error(data.message || "Failed to add project.");
            }
        } catch (err) {
            toast.error("Error add project: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-lg font-medium text-primary">Loading FAQ details...</span>
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

    if (!faq) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <span className="ml-3 text-lg font-medium text-gray-600">FAQ not found.</span>
            </div>
        );
    }


    return (
        <section>
            <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                <div className="flex flex-row items-center justify-center gap-1">
                    <MdOutlineGroups /><h1>Add FAQ</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="sno" className="block text-sm font-medium text-gray-700">S.No.</label>
                    <input type="number" id="sno" name="sno" value={faq.sno} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                </div>

                <div className="mb-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                    <textarea id="question" name="question" value={faq.question} onChange={handleChange} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>

                <div>
                    <label htmlFor="answere" className="block text-sm font-medium text-gray-700">Answere</label>
                    <textarea id="answere" name="answere" value={faq.answere} onChange={handleChange} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>

                <div className="mt-6">
                    <button type="submit" disabled={submitting} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        {submitting ? 'Adding...' : 'Add FAQ'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default FaqNewForm;