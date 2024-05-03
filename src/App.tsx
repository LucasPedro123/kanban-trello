import Diagrama from './Components/Diagram/Diagram-component'
import Sidebar from "./Components/Sidebar/Sidebar-component";
import Sidebar2 from './Components/Sidebar2/Sidebar-component';
import Sidebar3 from './Components/Sidebar3/Sidebar-component';
import Dashboard from "./Home/Dashboard";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/diagrama" element={<Sidebar2 />} />
        <Route path="/mais-vendidos" element={<Sidebar3 />} />
      </Routes>
    </>
  )
}

export default App;
