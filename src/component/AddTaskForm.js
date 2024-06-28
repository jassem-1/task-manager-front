import { useContext, useState } from 'react';
import axios from 'axios';
import { NotificationContext } from './ViewPage';
import Notification from './Notification';

const AddTaskModal = ({ isOpen, onClose }) => {
  const notification = useContext(NotificationContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, dueDate, time, category };
      const { data } = await axios.post('https://back-task-fhij.onrender.com/api/tasks/add', newTask);

      if (data.success === true) {
        notification(currentValue => {
          if (currentValue) {
            return [...currentValue, <Notification key={Date.now()} msg={data.msg} type="success" />];
          }
          return [<Notification key={Date.now()} msg={data.msg} type="success" />];
        });

        // Close the modal after successful submission
        onClose();

        // Delay before refreshing the page
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the delay time (in milliseconds) as needed
      }
    } catch (error) {
      console.error('There was an error adding the task!', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-40 px-4 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
