import { useContext, useState } from "react";
import { NotificationContext } from "./ViewPage";
import Notification from "./Notification";
import axios from "axios";
import { TasksContext } from "./ListView";

export const icons = {
  /*   Food: <i className="fa-solid fa-utensils" style={{ marginRight: "10px" }}></i>,
    Map: <i className="fa-solid fa-map" style={{ marginRight: "10px" }}></i>,
    Meeting: <i className="fa-solid fa-handshake" style={{ marginRight: "10px" }}></i>,
    Travel: <i className="fa-solid fa-plane-arrival" style={{ marginRight: "10px" }}></i>,
    Games: <i className="fa-solid fa-gamepad" style={{ marginRight: "10px" }}></i>,
    Sport: <i className="fa-solid fa-volleyball" style={{ marginRight: "10px" }}></i>,
    Other: <i className="fa-regular fa-circle-question" style={{ marginRight: "10px" }}></i> */
};

export default function TaskListRow({ state, title, category, dueDate, _id, time, description }) {
    const notification = useContext(NotificationContext);
    const updateTask = useContext(TasksContext);
    const [taskState, setTaskState] = useState(state);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const removeTask = async () => {
        const { data } = await axios.delete(`https://back-task-fhij.onrender.com/api/tasks/${_id}`);
        if (data.success) {
            notification(currentValue => {
                if (currentValue) {
                    return [...currentValue, <Notification msg={data.msg} type="success" />];
                }
                return [<Notification msg={data.msg} type="success" />];
            });

            updateTask(currVal => {
                return !currVal;
            });
        }
    };

    const changeTaskState = async (e) => {
        const newState = e.target.value;
        const { data } = await axios.put(`https://back-task-fhij.onrender.com/api/tasks/${_id}`, {
            state: newState
        });
        if (data.success) {
            notification(currentValue => {
                if (currentValue) {
                    return [...currentValue, <Notification msg={data.msg} type="success" />];
                }
                return [<Notification msg={data.msg} type="success" />];
            });

            updateTask(currVal => {
                return !currVal;
            });
            setTaskState(newState);
        }
    };



    return (
        <div className="item_row w-full p-4 border border-gray-400 bg-white shadow-md rounded-lg">
        <div className="task_row_header w-full flex justify-between items-center">
            <div className="task_row_title relative">
                <span className={`${state === "completed" ? "line-through" : ""} text-lg font-semibold`}>
                    {title}
                </span>
                <div className="flex items-center space-x-2 text-gray-500 mt-2">
                    <span className="flex items-center">
                        {icons[category]}
                        <span className="ml-2">{category}</span>
                    </span>
                </div>
            </div>
            <div className="cursor-pointer" onClick={toggleExpansion}>
                <i className={`fa-solid ${isExpanded ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
            </div>
        </div>
        {isExpanded && (
            <div className="mt-4">
                <div className="flex items-center space-x-2 text-gray-500 mt-2">
                    <span>{dueDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 mt-2">
                    <span>{time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 mt-2">
                    <span>{description || "u didn't enter any description"}</span>
                </div>
                <div className="mt-4">
                    <select
                        value={taskState}
                        onChange={changeTaskState}
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="to do">To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-end mt-4">
                    <i
                        className="fa-solid fa-calendar-xmark text-red-500 hover:text-red-700 transition duration-200 cursor-pointer"
                        onClick={removeTask}
                    ></i>
                </div>
            </div>
        )}
    </div>
    
    
    );
}
