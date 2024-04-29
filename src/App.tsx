import Diagrama from './Components/Diagram/Diagram-component'
import Sidebar from "./Components/Sidebar/Sidebar-component";
import Sidebar2 from './Components/Sidebar2/Sidebar-component';
import Dashboard from "./Home/Dashboard";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/about" element={<Sidebar2 />} />
      </Routes>
    </>
  )
}

export default App;
