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
    }, [index]);

    return (
        <>
            <aside className="bg-gray-800 min-h-screen text-white w-64 flex-shrink-0">
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
            {/* Small Screen Sidebar */}
            <aside className="bg-gray-800 text-white w-64 flex-shrink-0" ref={smallAsideRef}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Logo</h2>
                </div>
                <ul className="space-y-2 mt-6">
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/ListView" className="flex items-center w-full">
                            <i className="fa-solid fa-list-check mr-2"></i>
                            <span>List</span>
                        </Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/Calendar" className="flex items-center w-full">
                            <i className="fa-solid fa-calendar-days mr-2"></i>
                            <span>Calendar</span>
                        </Link>
                    </li>
                
                </ul>
            </aside>
        </>
    );
}
