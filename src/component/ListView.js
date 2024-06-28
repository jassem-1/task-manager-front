import "./ListView.css";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import TaskListRow from "./TaskListRow";

export const TasksContext = createContext();

export default function ListView() {
    const [updateTasks, setUpdateTasks] = useState(false);
    const [toDoTasks, setToDoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const getTasks = async () => {
        try {
            const { data } = await axios.get("https://back-task-fhij.onrender.com/api/tasks");
            if (data.success === true && data.data.length > 0) {
                const toDo = data.data
                    .filter(e => e.state === "to do")
                    .map((e, i) => <TaskListRow key={i} {...e} />);
                setToDoTasks(toDo);

                const inProgress = data.data
                    .filter(e => e.state === "in progress")
                    .map((e, i) => <TaskListRow key={i} {...e} />);
                setInProgressTasks(inProgress);

                const completed = data.data
                    .filter(e => e.state === "completed")
                    .map((e, i) => <TaskListRow key={i} {...e} />);
                setCompletedTasks(completed);
            } else {
                setToDoTasks([]);
                setInProgressTasks([]);
                setCompletedTasks([]);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getTasks();
    }, [updateTasks]);

    return (
        <TasksContext.Provider value={setUpdateTasks}>
            <div className="flex justify-evenly items-start p-6 bg-gray-100 min-h-screen" id="task_lists">
                <div className="task_list w-full max-w-sm bg-white shadow-lg rounded-lg p-4 mx-2">
                    <div className="task_list_header border-b pb-2 mb-4">
                        <h4 className="text-xl font-semibold text-gray-700">TO DO</h4>
                        <h6 className="text-sm text-gray-500">tasks {toDoTasks.length === 0 ? '0' : toDoTasks.length}</h6>
                    </div>
                    <ul className="w-full space-y-2">
                        {toDoTasks.length > 0 ? toDoTasks : <li className="empty_list">List is empty</li>}
                    </ul>
                </div>
                <div className="task_list w-full max-w-sm bg-white shadow-lg rounded-lg p-4 mx-2">
                    <div className="task_list_header border-b pb-2 mb-4">
                        <h4 className="text-xl font-semibold text-gray-700">IN PROGRESS</h4>
                        <h6 className="text-sm text-gray-500">tasks {inProgressTasks.length === 0 ? '0' : inProgressTasks.length}</h6>
                    </div>
                    <ul className="w-full space-y-2">
                        {inProgressTasks.length > 0 ? inProgressTasks : <li className="empty_list">List is empty</li>}
                    </ul>
                </div>
                <div className="task_list w-full max-w-sm bg-white shadow-lg rounded-lg p-4 mx-2">
                    <div className="task_list_header border-b pb-2 mb-4">
                        <h4 className="text-xl font-semibold text-gray-700">COMPLETED</h4>
                        <h6 className="text-sm text-gray-500">tasks {completedTasks.length === 0 ? '0' : completedTasks.length}</h6>
                    </div>
                    <ul className="w-full space-y-2">
                        {completedTasks.length > 0 ? completedTasks : <li className="empty_list">List is empty</li>}
                    </ul>
                </div>
            </div>
        </TasksContext.Provider>
    );
}
