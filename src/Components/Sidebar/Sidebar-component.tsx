import { useState } from 'react';
import Dashboard from '../../Home/Dashboard';
import logo from '../../asserts/images/logo-daho.png'
import controll from '../../asserts/images/control.png'
import './Sidebar-style.css'
import { Link } from 'react-router-dom';
import tasksIcon from '../../asserts/images/lista-de-afazeres (1).png'
import diagramIcon from '../../asserts/images/diagrama (1).png'


function Sidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Kanban", src: tasksIcon, link: "" },
    { title: "Diagrama", src: diagramIcon, link: "about" },
  ];

  return (
    <div className="flex">
      <div
        className={`bg ${open ? "w-72" : "w-20"
          }  h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={controll}
          className={`c absolute cursor-pointer -right-3 top-9 w-7 
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
            width="100px"
          />
          <h1
            className={`text origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            DAHO
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={`/${Menu.link}`} key={index}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
              >
                <img src={`${Menu.src}`} width="20px"  />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen w-96 flex-1 p-7">
        <Dashboard />
      </div>
    </div>
  );
}

export default Sidebar;
