import ViewPage from './component/ViewPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarView from './component/CalendarView';
import ListView from './component/ListView';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/' element={<ViewPage view={<ListView/>} index={1}/>} />
      <Route path='/ListView' element={<ViewPage view={<ListView/>} index={1}/>} />
      <Route path='/Calendar' element={<ViewPage index={2} view={<CalendarView/>}/>} />
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
