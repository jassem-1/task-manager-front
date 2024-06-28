import "./ViewPage.css";
import { createContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AddTaskModal from "./AddTaskForm";

export const NotificationContext = createContext();
export default function Main({ view, index }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [notification, setNotification] = useState();
    const [listView, setListView] = useState(view);
    const [dashboard, setDashboard] = useState(<Sidebar key={index} index={index} />);

    useEffect(() => {
        setListView(current => [current]);
    }, []);

    useEffect(() => {
        setListView(view);
        setDashboard([<Sidebar key={index} index={index} />]);
    }, [view, index]);

    return (
        <NotificationContext.Provider value={setNotification}>
            <div id="Main">
                {dashboard}
                <div className="main_container">
                    <div className="w-full bg-white p-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={openModal}>
                            Add Task
                        </button>
                    </div>
                    {listView}
                    <AddTaskModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
                <div className="notif_container">
                    <div>
                        {notification}
                    </div>
                </div>
            </div>
        </NotificationContext.Provider>
    );
}
