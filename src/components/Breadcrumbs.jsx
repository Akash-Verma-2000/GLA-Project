import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";

export default function Breadcrumb({ routes }) {

    return (
        <>
            <div className="flex justify-center items-center">

                {routes?.map((elem, index) => {
                    return (
                        <>
                            <Link href={elem?.path} key={index} className={`${index + 1 == routes.length ? "!text-black" : "!text-white"} font-semibold flex items-center gap-1`}>
                                {index == 0 ? <IoHomeOutline /> : null}{elem?.title}<span className={`mx-1 ${index + 1 == routes.length ? "hidden" : ""}`}>&gt;</span>
                            </Link>
                        </>
                    );
                })}

            </div>
        </>
    );
}
