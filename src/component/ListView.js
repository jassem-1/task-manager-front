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
        const { data } = await axios.get("http://localhost:3002/api/tasks");
        if (data.success === true && data.data.length > 0) {
            const toDo = data.data
                .filter(e => e.state === "to do")
                .map((e, i) => <TaskListRow key={i} {...e} />);
            setToDoTasks(toDo.length > 0 ? toDo : <li className="empty_list">List is empty</li>);

            const inProgress = data.data
                .filter(e => e.state === "in progress")
                .map((e, i) => <TaskListRow key={i} {...e} />);
            setInProgressTasks(inProgress.length > 0 ? inProgress : <li className="empty_list">List is empty</li>);

            const completed = data.data
                .filter(e => e.state === "completed")
                .map((e, i) => <TaskListRow key={i} {...e} />);
            setCompletedTasks(completed.length > 0 ? completed : <li className="empty_list">List is empty</li>);
        } else {
            setToDoTasks(<li className="empty_list">List is empty</li>);
            setInProgressTasks(<li className="empty_list">List is empty</li>);
            setCompletedTasks(<li className="empty_list">List is empty</li>);
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
            <h6 className="text-sm text-gray-500">tasks {toDoTasks.length}</h6>
        </div>
        <ul className="w-full space-y-2">
            {toDoTasks}
        </ul>
    </div>
    <div className="task_list w-full max-w-sm bg-white shadow-lg rounded-lg p-4 mx-2">
        <div className="task_list_header border-b pb-2 mb-4">
            <h4 className="text-xl font-semibold text-gray-700">IN PROGRESS</h4>
            <h6 className="text-sm text-gray-500">tasks {inProgressTasks.length}</h6>
        </div>
        <ul className="w-full space-y-2">
            {inProgressTasks}
        </ul>
    </div>
    <div className="task_list w-full max-w-sm bg-white shadow-lg rounded-lg p-4 mx-2">
        <div className="task_list_header border-b pb-2 mb-4">
            <h4 className="text-xl font-semibold text-gray-700">COMPLETED</h4>
            <h6 className="text-sm text-gray-500">tasks {completedTasks.length}</h6>
        </div>
        <ul className="w-full space-y-2">
            {completedTasks}
        </ul>
    </div>
</div>

        </TasksContext.Provider>
    );
}
