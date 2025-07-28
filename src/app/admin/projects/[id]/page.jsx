"use client"

import { useEffect, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

const ProjectNewForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState({
        sno: '',
        image: null,
        title: '',
        description: '',
        phone: '',
        email: '',
        address: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    setError("Unauthorized: Please login again.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`/api/project/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                const data = await res.json();

                if (data.status === "success") {
                    setProject(data.data);
                } else {
                    setError(data.message || "Failed to fetch project details.");
                }
            } catch (err) {
                setError("Error fetching project details: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProject(prev => ({
                    ...prev,
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

            const res = await fetch(`/api/project`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project),
            });

            const data = await res.json();

            if (data.status === "success") {
                toast.success("Project add successfully!");
                router.push("/admin/projects");
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
                <span className="ml-3 text-lg font-medium text-primary">Loading project details...</span>
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

    if (!project) {
        return (
            <div className="flex items-center justify-center min-h-screen pb-[200px]">
                <span className="ml-3 text-lg font-medium text-gray-600">Project not found.</span>
            </div>
        );
    }

    return (
        <section>
            <div className="bg-primary hidden lg:block text-white text-lg py-2 px-5 rounded-lg font-semibold  mb-5">
                <div className="flex flex-row items-center justify-center gap-1">
                    <MdOutlineGroups /><h1>Add Project</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="sno" className="block text-sm font-medium text-gray-700">S.No.</label>
                        <input type="number" id="sno" name="sno" value={project.sno} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title" value={project.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" id="phone" name="phone" value={project.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="text" id="email" name="email" value={project.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" id="address" name="address" value={project.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        {project.image && typeof project.image === 'string' && project.image.startsWith('data:image') && (
                            <img src={project.image} alt="Current Employee Image" className="mt-2 w-40 h-40 object-cover rounded-md" />
                        )}
                        {project.image && typeof project.image === 'string' && !project.image.startsWith('data:image') && (
                            <img src={project.image} alt="Current Employee Image" className="mt-2 w-40 h-40 object-cover rounded-md" />
                        )}
                    </div>

                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" value={project.description} onChange={handleChange} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>
                <div className="mt-6">
                    <button type="submit" disabled={submitting} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        {submitting ? 'Updating...' : 'Update Project'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ProjectNewForm;