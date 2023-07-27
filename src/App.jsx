import { MdDashboard, MdOutlineAnalytics } from "react-icons/md"
import { BsFillCalendarFill } from "react-icons/bs"
import { AiFillDatabase, AiTwotoneSetting, AiOutlinePlus } from "react-icons/ai"
import { FiMenu } from "react-icons/fi"
import { BsSunFill } from "react-icons/bs"
import {IoMoon} from "react-icons/io5"
import {FaObjectGroup} from "react-icons/fa"
import './App.css'
import { useEffect, useRef, useState } from "react"
import { HashRouter, NavLink, Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard/dashboard"
import Calendar from "./components/calendar/calendar"
import Analyse from "./components/analyse/analyse"
import Data from "./components/data/data"
import NewEvent from "./components/newEvent/newEvent"
import Setting from "./components/setting/setting"
import GroupSetting from "./components/groupsetting/groupsetting"

const App = () => {

  const showMenu = useRef("none");


  /*////////////////////////////*//**////////////////////////////*/

  let aca = {"group":[]};
    if (JSON.parse(localStorage.getItem("setting")) != null) {
        aca = JSON.parse(localStorage.getItem("setting"));
    }
    const [data, setData] = useState([]);
    const [settingprofile, setsettingprofile] = useState(aca);

  const rerenderStatus = useRef(false);
  const colorstatus = useRef(false);
  
  /*////////////////////////////*//**////////////////////////////*/

  useEffect(()=>{

    if (JSON.parse(localStorage.getItem("setting")) != null) {
      setsettingprofile(JSON.parse(localStorage.getItem("setting")));
    } else {
      setsettingprofile({
        "group": []
      })
    }

    /**////////////////////////////*/

    if (localStorage.getItem("user") != null) {
      setData(JSON.parse(localStorage.getItem("user")).posts)
  }

  }, ["a"])

  /*--------------------------------*/

  useEffect(()=> {
    if (rerenderStatus.current == false) {
        return;
    } else {
        localStorage.setItem('user', JSON.stringify({
            "posts": data
        }));
        rerenderStatus.current = false; 
    }
}, [data]);

  /*////////////////////////////*//**////////////////////////////*/

  return (
    <div className="App">
      <HashRouter>
      <aside>
        <div>
          <h2 className="fill">Fill</h2>
          
          <NavLink to="/"><span className="navbutton"><MdDashboard /><a>Dashboard</a></span></NavLink>
          <NavLink to="/Calendar/"><span className="navbutton"><BsFillCalendarFill /><a>Calendar</a></span></NavLink>
          <NavLink to="/Analyse/"><span className="navbutton"><MdOutlineAnalytics /><a>Analyse</a></span></NavLink>
          <NavLink to="/Data/"><span className="navbutton"><AiFillDatabase /><a>Data</a></span></NavLink>
          <NavLink to="Group"><span className="navbutton"><FaObjectGroup /><a>Group</a></span></NavLink>
          <NavLink to="/NewEvent/"><span className="navbutton"><AiOutlinePlus /><a>New Event</a></span></NavLink>
          </div>
          <NavLink to="/Setting/"><span className="navbutton"><AiTwotoneSetting /><a>Setting</a></span></NavLink>
      </aside>
      <main>
        
        <div className="content">
            <Routes>
              <Route path="/" exact element={<Dashboard data={data} />} />
              <Route path="/Calendar/" exact element={<Calendar data={data} setData={setData} rerenderStatus={rerenderStatus} settingprofile={settingprofile} setsettingprofile={setsettingprofile} />} />
              <Route path="/Analyse/" exact element={<Analyse />} />
              <Route path="/Data/" exact element={<Data data={data} setData={setData} rerenderStatus={rerenderStatus} settingprofile={settingprofile} colorstatus={colorstatus} />} />
              <Route exact path="/Group/" element={<GroupSetting data={data} setData={setData} settingprofile={settingprofile} setsettingprofile={setsettingprofile} rerenderStatus={rerenderStatus} colorstatus={colorstatus} />} />
              <Route path="/NewEvent/" exact element={<NewEvent data={data} setData={setData} rerenderStatus={rerenderStatus} settingprofile={settingprofile} />} />
              <Route path="/Setting/" exact element={<Setting />} />
            </Routes>
        </div>
      </main>
      </HashRouter>
    </div>
  );
}

export default App;
