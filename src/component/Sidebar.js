import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ index }) {
    const [listRef, calendarRef, smallAsideRef] = [ useRef(), useRef(), useRef()];

    useEffect(() => {
        const refs = [listRef, calendarRef];
        refs.forEach(ref => ref.current.id = "");
        refs[index - 1].current.id = "clicked";

        if (window.innerWidth > 830) {
            smallAsideRef.current.style.display = "none";
        }
    },  [index, listRef, calendarRef, smallAsideRef]);

    return (
        <div>
            <aside className="bg-gray-800 min-h-screen text-white w-64 flex-shrink-0 hidden md:block">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Logo</h2>
                </div>
                <ul className="space-y-2 mt-6">
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer" ref={listRef}>
                        <Link to="/ListView" className="flex items-center w-full">
                            <i className="fa-solid fa-list-check mr-2"></i>
                            <span>List</span>
                        </Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer" ref={calendarRef}>
                        <Link to="/Calendar" className="flex items-center w-full">
                            <i className="fa-solid fa-calendar-days mr-2"></i>
                            <span>Calendar</span>
                        </Link>
                    </li>
                 
                </ul>
            </aside>
            <div className="md:hidden block fixed  bottom-0 w-full bg-gray-300">
                <div className="py-2 px-4">
                <div className="flex gap-x-2 justify-center items-center">
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer" ref={listRef}>
                        <Link to="/ListView" className="flex items-center w-fdivl">
                            <i className="fa-solid fa-list-check mr-2"></i>
                            <span>List</span>
                        </Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer" ref={calendarRef}>
                        <Link to="/Calendar" className="flex items-center w-full">
                            <i className="fa-solid fa-calendar-days mr-2"></i>
                            <span>Calendar</span>
                        </Link>
                    </li>
                 
                </div>



                </div>



            </div>
       
        </div>
    );
}
