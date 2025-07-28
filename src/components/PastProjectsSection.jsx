'use client';

import Image from 'next/image';
import { MdLocationOn, MdSecurity } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from 'react';

// const projects = [

//     {
//         title: "Bagla Inter College Hathras",
//         phone: "+91 7017565952",
//         description: "We've installed ME64 IP cameras across all school campuses, featuring 5MP resolution and full-color night vision. These cameras provide clear, reliable surveillance day and night, helping ensure a safer environment for students and staff.",
//         image: "/images/Bagla-Inter-College.jpg",
//         location: "Bagla Market, Hathras, Uttar Pradesh, India"
//     },
//     {
//         title: "Sita Ram Inter College",
//         phone: "+91 9997394440",
//         description: "A total of 36 ME64 IP cameras were installed across all school campuses, featuring 5MP resolution and full-color night vision. These cameras offer reliable, high-quality surveillance to keep the premises secure day and night.",
//         image: "/images/Sita-Ram-Inter-College.jpg",
//         location: "Hasayan, Hathras, Uttar Pradesh, India"
//     },
//     {
//         title: "Vitthal Pharmaceuticals",
//         phone: "+91 8384889147",
//         description: "We installed 64 IP cameras across the entire factory campus, equipped with 4K-quality NVR and full-color night vision. This setup ensures clear, round-the-clock surveillance for enhanced security and monitoring.",
//         image: "/images/Vitthal-Pharmacy.jpg",
//         location: "Dayanatpur, Hathras, Uttar Pradesh, India"
//     },
//     {
//         title: "Kanak Mobile Repairing Center ",
//         phone: "+91 9045676485",
//         description: "Complete shop was equipped with 8 IP cameras featuring 8MP resolution, full-color night vision, and connected to an 8-channel NVR for reliable and high-quality surveillance.",
//         image: "/images/Kanak-Mobile-Repairing-Shop.jpg",
//         location: "Nayee Nagla, Hathras, Uttar Pradesh, India"
//     }
// ];

export default function PastProjectsSection() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProjects, setTotalProjects] = useState(0);


    const fetchProjects = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            const res = await fetch(`/api/project?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();

            if (data.status === "success") {
                setProjects(data.data.projects);
                setTotalPages(data.data.totalPages);
                setTotalProjects(data.data.totalProjects);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [page, limit]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-lg font-medium text-primary">Loading projects...</span>
            </div>
        );
    }

    if (!projects.length && !loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <span className="ml-3 text-lg font-medium text-gray-600">No projects found.</span>
            </div>
        );
    }

    return (
        <section className="relative px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20  bg-gray-100 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none z-0">
                <svg width="100%" height="100%" className="opacity-10" style={{ position: 'absolute', left: 0, top: 0 }}>
                    <defs>
                        <pattern id="project-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="#3b82f6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#project-dots)" />
                </svg>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {projects.map((project, idx) => (
                    <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border-2 border-gray-200 hover:border-primary/50">

                        <div className="relative w-full h-48 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <MdSecurity className="w-12 h-12 text-white opacity-80" />
                            </div>
                        </div>

                        <div className="p-6">

                            <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-3">{project.description}</p>

                            {project.phone ?
                                <div className="flex gap-2 items-center text-primary mb-3">
                                    <FaPhoneAlt />  <p className=" text-sm text-gray-600 font-semibold">{project.phone}</p>
                                </div> : null
                            }

                            {project.email ?
                                <div className="flex gap-2 items-center text-primary mb-3">
                                    <MdEmail />  <p className=" text-sm text-gray-600 font-semibold">{project.email}</p>
                                </div> : null
                            }

                            {project.address ?
                                <div className="flex gap-2 items-center">
                                    <MdLocationOn className="text-primary text-xl" />
                                    <p className="text-sm text-gray-600 font-semibold">
                                        {project.address}
                                    </p>
                                </div> : null
                            }

                        </div>

                    </div>
                ))}

            </div>

            {projects.length && !loading ?
                <div className="flex flex-col lg:flex-row gap-5 items-center justify-center mt-10">
                    {/* <div className="flex items-center gap-2">
                        <label htmlFor="rowsPerPage" className="text-sm text-gray-800">Rows per page:</label>
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
                    <span className="text-sm text-gray-800 hidden lg:block">
                        {(page - 1) * limit + 1} to {Math.min(page * limit, totalProjects)} of {totalProjects} Projects
                    </span> */}
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


        </section>
    );
} 