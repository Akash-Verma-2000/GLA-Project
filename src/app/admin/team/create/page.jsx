"use client"

import { useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EmployeeNewForm = () => {
    const router = useRouter();

    const [employee, setEmployee] = useState({
        sno: '',
        name: '',
        designation: '',
        description: '',
        image: null,
        websiteLink: ''
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee(prevEmployee => ({
                    ...prevEmployee,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
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

            const res = await fetch(`/api/employee`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee),
            });

            const data = await res.json();

            if (data.status === "success") {
                toast.success("Employee add successfully!");
                router.push("/admin/team");
            } else {
                toast.error(data.message || "Failed to add employee.");
            }
        } catch (err) {
            toast.error("Error add employee: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section>
            <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                <div className="flex flex-row items-center justify-center gap-1">
                    <MdOutlineGroups /><h1>Add Employee</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="sno" className="block text-sm font-medium text-gray-700">S.No.</label>
                        <input type="number" id="sno" name="sno" value={employee.sno} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        <p className="gray-600 text-xs">Leave this field empty if you want to add the employee in the last</p>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={employee.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                        <input type="text" id="designation" name="designation" value={employee.designation} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="websiteLink" className="block text-sm font-medium text-gray-700">Website Link</label>
                        <input type="text" id="websiteLink" name="websiteLink" value={employee.websiteLink} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {employee.image && typeof employee.image === 'string' && employee.image.startsWith('data:image') && (
                            <img src={employee.image} alt="Current Employee Image" className="mt-2 w-40 h-40 object-cover rounded-md" />
                        )}
                        {employee.image && typeof employee.image === 'string' && !employee.image.startsWith('data:image') && (
                            <img src={employee.image} alt="Current Employee Image" className="mt-2 w-40 h-40 object-cover rounded-md" />
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" value={employee.description} onChange={handleChange} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>
                <div className="mt-6">
                    <button type="submit" disabled={submitting} className="px-4 py-2 cursor-pointer bg-primary text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        {submitting ? 'Adding...' : 'Add Employee'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EmployeeNewForm;