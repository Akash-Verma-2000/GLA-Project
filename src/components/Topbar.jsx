'use client';
import { IoCall } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";


import Link from "next/link";

export default function TopBar() {

    return <>

        <section className="border-b-2 border-primary !fixed top-0 w-full bg-cover bg-center !z-50">

            <div className="flex justify-center lg:justify-between items-center bg-blue-100 pt-2 pb-2 border-gradient-bottom lg:px-36">

                <div className="flex">

                    <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">

                        <a href="mailto:contact@omnetworkindia.com?subject=Inquiry%20Regarding%20Services" target="_blank" rel="noopener noreferrer" >
                            <span className="font-bold text-primary"><HiOutlineMail /></span>
                        </a>

                    </div>

                    <p className="hidden !text-primary lg:block me-5">contact@omnetworkindia.com</p>

                    <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">

                        <a href="tel:+917017757089" className="lg:hidden">
                            <span className="text-primary"><IoCall /></span>
                        </a>

                        <span className="hidden lg:block text-primary"><IoCall /></span>

                    </div>

                    <p className="hidden !text-primary lg:block me-2">+91 7017757089</p>

                </div>

                <div className="flex">

                    <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                        <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer">
                            <span className="text-primary"><FaFacebookF /></span>
                        </Link>
                    </div>

                    <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                        <Link href="https://www.instagram.com/om.network.india/" target="_blank" rel="noopener noreferrer">
                            <span className="text-primary"><GrInstagram /></span>
                        </Link>
                    </div>

                    <div className="cursor-pointer flex justify-center items-center bg-primary/15 w-7 h-7 me-2 rounded-sm">
                        <Link href="https://www.youtube.com/@omnetworkindia" target="_blank" rel="noopener noreferrer">
                            <span className="text-primary"><BsYoutube /></span>
                        </Link>
                    </div>

                </div>

            </div>

        </section>

    </>
}