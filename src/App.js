import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewPage from './component/ViewPage';
import ListView from './component/ListView';
import CalendarWithTasks from './component/CalendarTest';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');

  useEffect(() => {
    // Check localStorage for authentication status
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    setAuthenticated(isAuthenticated);
  }, []);

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    const accessCode = process.env.REACT_APP_ACCESS_CODE;

    if (inputCode === accessCode) {
      setAuthenticated(true);
      localStorage.setItem('authenticated', 'true'); // Save authentication status
    } else {
      alert('Invalid access code');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authenticated'); // Clear authentication status
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Access Code</h2>
          <form onSubmit={handleCodeSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Access Code:</span>
              <input
                type="text"
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>
        <Routes>
          <Route path="/" element={<ViewPage view={<ListView />} index={1} />} />
          <Route path="/ListView" element={<ViewPage view={<ListView />} index={1} />} />
          <Route path="/Calendar" element={<ViewPage index={2} view={<CalendarWithTasks />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
