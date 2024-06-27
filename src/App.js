import ViewPage from './component/ViewPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListView from './component/ListView';
import CalendarWithTasks from './component/CalendarTest';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<ViewPage view={<ListView/>} index={1}/>} />
      <Route path='/ListView' element={<ViewPage view={<ListView/>} index={1}/>} />
      <Route path='/Calendar' element={<ViewPage index={2} view={<CalendarWithTasks/>}/>} />
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
