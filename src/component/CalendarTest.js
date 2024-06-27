import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
const localizer = momentLocalizer(moment);
const CalendarWithTasks = () => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:3002/api/tasks');
          setTasks(response.data.data); // Assuming response structure has data field containing tasks
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
  
      fetchTasks();
    }, []);
  
    // Function to transform tasks data into calendar events
    const getCalendarEvents = () => {
      return tasks.map(task => ({
        title: task.title,
        start: new Date(task.dueDate), // Assuming dueDate is a string in ISO format "YYYY-MM-DD"
        end: new Date(task.dueDate), // For single day events, start and end can be the same
      }));
    };
  
    return (
      <div className="flex flex-col items-center justify-center">
        <Calendar
          localizer={localizer}
          events={getCalendarEvents()}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={['month']}
        />
       
      </div>
    );
  };
  
  export default CalendarWithTasks;
  