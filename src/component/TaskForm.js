import { forwardRef, useContext, useRef, useState } from "react";
import Calendar from "./Calendar";
import axios from "axios";
import { NotificationContext } from "./ViewPage";
import Notification from "./Notification";

const TaskForm = forwardRef(({ reRenderTasks }, ref) => {
  const notification = useContext(NotificationContext);

  const tasknameInput = useRef();
  const taskCategoryInput = useRef();
  const HourInput = useRef();
  const minutesInput = useRef();
  const descriptionInput = useRef();
  const pathInput = useRef();

  const [date, setDate] = useState("dd-mm-yyyy");

  const sendData = async () => {
    const task = {
      title: tasknameInput.current.value,
      category: taskCategoryInput.current.value,
      dueDate: date,
      time: `${HourInput.current.value}:${minutesInput.current.value}`,
      description: descriptionInput.current.value,
      path:
        pathInput.current.value === ""
          ? "/"
          : pathInput.current.value.replace("C:\\fakepath\\", "uploads/"),
    };

    try {
      const { data } = await axios.post("https://back-task-fhij.onrender.com/api/tasks/add", task);
      if (data.success === true) {
        notification((currentValue) => {
          if (currentValue) {
            return [...currentValue, <Notification key={Date.now()} msg={data.msg} type="success" />];
          }
          return [<Notification key={Date.now()} msg={data.msg} type="success" />];
        });
        reRenderTasks((re) => !re); // Trigger re-render of tasks
        const img = document.querySelector('input[type="file"]').files[0];
        if (img) {
          const formData = new FormData();
          formData.append("image", img);
          const imgUpload = await axios.post("https://back-task-fhij.onrender.com/api/tasks/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          notification((currentValue) => {
            if (currentValue) {
              return [...currentValue, <Notification key={Date.now()} msg={imgUpload.data} type="success" />];
            }
            return [<Notification key={Date.now()} msg={imgUpload.data} type="success" />];
          });
        }
        clearInputs();
        ref.current.style.display = "none";
      } else {
        data.msg.forEach((msg, i) => {
          notification((currentValue) => {
            if (currentValue === undefined) {
              return [<Notification key={i} type={"error"} msg={msg} />];
            }
            return [...currentValue, <Notification key={i} type={"error"} msg={msg} />];
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearInputs = () => {
    tasknameInput.current.value = "";
    taskCategoryInput.current.value = "";
    HourInput.current.value = "";
    minutesInput.current.value = "";
    descriptionInput.current.value = "";
    pathInput.current.value = "";
  };

  return (
    <div id="form_container" ref={ref} onClick={(e) => {
      if (e.target.id === ref.current.id || e.target.id === "close_form" || e.target.classList.contains("fa-xmark")) {
        ref.current.style.display = "none";
      }
    }}>
      <div id="form_holder">
        <div id="close_form">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div id="infos_form_container">
          <div id="calendar_form_container">
            <Calendar dateState={setDate} />
          </div>
          <div id="inputs_form_container">
            <div className="input_con">
              <span>Task name</span>
              <input type="text" placeholder="Task name" id="task_name_input" ref={tasknameInput} />
            </div>
            <div className="input_con">
              <span>Category</span>
              <select id="category_select" className="fa" ref={taskCategoryInput}>
                <option className="fa" value="Food">&nbsp; Food</option>
                <option className="fa" value="Map">&nbsp; Map</option>
                <option className="fa" value="Meeting">&nbsp; Meeting</option>
                <option className="fa" value="Travel">&nbsp; Travel</option>
                <option className="fa" value="Games">&nbsp; Games</option>
                <option className="fa" value="Sport">&nbsp; Sport</option>
                <option className="fa" value="Other">Other</option>
              </select>
            </div>
            <div className="date_picker">
              <div id="date_displayer">
                {date} <div id="calendar_icon_con"><i className="fa-solid fa-calendar-check"></i></div>
              </div>
              <div id="time_input">
                <input type="number" placeholder="H" ref={HourInput} /> : <input type="number" placeholder="M" ref={minutesInput} />
                <div id="clock_icon_con">
                  <i className="fa-solid fa-clock"></i>
                </div>
              </div>
            </div>
            <div className="input_con desc_con">
              <span>Description</span>
              <textarea ref={descriptionInput} cols={40} rows={4}></textarea>
            </div>
            <div className="upload_send_container">
              <input type="file" multiple accept="image/*" id="file" ref={pathInput} />
              <button id="upload" onClick={sendData}>Save <i className="fa-regular fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TaskForm;
