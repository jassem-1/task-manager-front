import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewPage from './component/ViewPage';
import ListView from './component/ListView';
import CalendarWithTasks from './component/CalendarTest';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    const accessCode = process.env.REACT_APP_ACCESS_CODE;

    if (inputCode === accessCode) {
      setAuthenticated(true);
    } else {
      alert('Invalid access code');
    }
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
        <Routes>
          <Route path="/" element={<ViewPage view={<ListView />} index={1} />} />
          <Route
            path="/ListView"
            element={<ViewPage view={<ListView />} index={1} />}
          />
          <Route
            path="/Calendar"
            element={<ViewPage index={2} view={<CalendarWithTasks />} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
