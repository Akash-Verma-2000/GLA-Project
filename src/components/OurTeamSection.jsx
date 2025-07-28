'use client';
import { IoGlobeOutline } from "react-icons/io5";


import Image from 'next/image';
import { useEffect, useState } from "react";

// const team = [
//   {
//     name: "Mahesh Chandra Verma",
//     role: "Managing Director",
//     image: "/images/Maheshchand-Profile-Picture.jpg",
//     bio: "Visionary Managing Director of OM Network India, dedicated to delivering innovative network solutions and building strong client relationships."
//   },
//   {
//     name: "Er. Mohit Verma",
//     role: "Founder & CEO",
//     image: "/images/Mohit-Profile-Picture.jpg",
//     bio: "Passionate Founder and CEO, committed to pioneering new ideas and leading the company toward sustainable success."
//   },
//   {
//     name: "Lokendra Singh Verma",
//     role: "Co-Founder & CFO",
//     image: "/images/Lokendra-Profile-Picture.jpg",
//     bio: "Strategic Co-Founder and CFO, focused on financial excellence and driving sustainable growth through smart leadership."
//   },
//   {
//     name: "Akash Verma",
//     role: "IT & Software Consultant",
//     image: "/images/Akash-Profile-Picture.jpg",
//     website: "www.infotechistan.com",
//     bio: "Founder at Infotechistan and IT & Software Consultant at OM Network India, focused on delivering smart, scalable tech solutions and driving digital innovation."
//   },
//   {
//     name: "Prashant Varshney",
//     role: "Accounts Head",
//     image: "/images/Prashant-Profile-Picture.jpg",
//     bio: "Experienced Accounts Head skilled in managing financial operations, ensuring accuracy, and supporting business growth through sound financial practices."
//   },
//   {
//     name: "Pradeep Agrawal",
//     role: "Accounts Executive",
//     image: "/images/Pradeep-Profile-Picture.jpg",
//     bio: "Detail-oriented Accounts Executive, skilled in managing day-to-day financial transactions and maintaining accurate records to support smooth business operations."
//   },
//   {
//     name: "Varsha Verma",
//     role: "Staff Manager",
//     image: "/images/Varsha-Profile-Picture.jpg",
//     bio: "Skilled Staff Manager with experience leading teams, ensuring smooth operations, and fostering a positive work environment."
//   },
//   {
//     name: "Amir Saifi",
//     role: "Field Operator",
//     image: "/images/Amir-Profile-Picture.jpg",
//     bio: "Reliable Field Operator skilled in managing on-site operations, ensuring safety, and maintaining efficient workflow in dynamic environments."
//   },
//   {
//     name: "Kapil",
//     role: "Field Operator",
//     image: "/images/Kapil-Profile-Picture.jpg",
//     bio: "Dedicated Field Operator with hands-on expertise in equipment handling, site coordination, and ensuring smooth field operations with a focus on safety and efficiency."
//   },
//   {
//     name: "Kunal",
//     role: "Field Operator",
//     image: "/images/Kunal2-Profile-Picture.jpg",
//     bio: "Skilled Field Operator with a strong focus on on-site execution, troubleshooting, and maintaining operational standards in fast-paced environments."
//   },
//   {
//     name: "Saurabh Verma",
//     role: "Field Operator",
//     image: "/images/Saurabh-Profile-Picture.jpg",
//     bio: "Field Operator focused on building strong partnerships and delivering personalized, high-quality service to drive client satisfaction and growth."
//   },
//   {
//     name: "Kunal Verma",
//     role: "Field Operator",
//     image: "/images/Kunal-Verma-Profile-Picture.jpg",
//     bio: "Efficient Field Operator experienced in performing on-site tasks, coordinating with teams, and ensuring timely and accurate service delivery."
//   },
//   {
//     name: "Sumit",
//     role: "Field Operator",
//     image: "/images/Sumit-Profile-Picture.jpg",
//     bio: "Focused and dependable Field Operator, responsible for executing field operations, maintaining equipment, and ensuring service quality and compliance on-site."
//   },
// ];

export default function OurTeam({ addIntro = true }) {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const res = await fetch(`/api/employee?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        setEmployees(data.data.employees);
        setTotalPages(data.data.totalPages);
        setTotalEmployees(data.data.totalEmployees);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [page, limit]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-3 text-lg font-medium text-primary">Loading team members...</span>
      </div>
    );
  }

  if (!employees.length && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <span className="ml-3 text-lg font-medium text-gray-600">No team member found.</span>
      </div>
    );
  }

  return (
    <section className="relative px-5 sm:px-10 md:px-20  py-10 sm:py-14 lg:py-20 bg-gray-200 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="opacity-10" style={{ position: 'absolute', left: 0, top: 0 }}>
          <defs>
            <pattern id="dots-team" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#3b82f6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-team)" />
        </svg>
      </div>
      {/* <div className="max-w-6xl mx-auto relative z-10"> */}

      {addIntro && (
        <div className="mb-10">
          <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-to">
            Our Team
          </h2>
          <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
            At Om Network India, our team of skilled and certified professionals is the backbone of our success. With years of experience in CCTV installation and security services, we are dedicated to delivering reliable, efficient, and customer-focused solutions to protect what matters most.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {employees.map((member, idx) => (
          <div
            key={idx}
            className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center text-center group overflow-hidden border border-transparent hover:border-primary/40 hover:border-2 hover:shadow-2xl transition-all duration-300"
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:shadow-[0_0_40px_0_rgba(59,130,246,0.15)] transition" />
            {/* Profile image with glow */}
            <div className="relative w-40 h-40 mb-4 group-hover:scale-105 transition-transform duration-300">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 to-blue-400/20 blur-lg opacity-70 group-hover:opacity-90 transition" />
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full border-4 border-primary shadow-lg"
                sizes="112px"
              />
            </div>
            <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
            <div className=" text-gray-800 mb-2 font-semibold">{member.designation}</div>

            {member.websiteLink ? <a href={member.websiteLink} target="blank" className="text-primary mb-2 flex items-center gap-1"><IoGlobeOutline />{member.websiteLink}</a> : null}

            <p className="text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>


      {employees.length && !loading ?
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
              <option value="12">10</option>
              <option value="24">20</option>
              <option value="36">50</option>
              <option value="48">100</option>
            </select>
          </div> */}
          {/* <span className="text-sm text-gray-800 hidden lg:block">
            {(page - 1) * limit + 1} to {Math.min(page * limit, totalEmployees)} of {totalEmployees} Members
          </span> */}
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 text-md"
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
