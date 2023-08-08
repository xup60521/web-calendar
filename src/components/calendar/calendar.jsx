import { useState, useEffect } from "react";
import Month from "./month";
import Day from "./day";
import Week from "./week";
import { useSelector } from "react-redux";


const Calendar = ({ rerenderStatus }) => {

    /*---------------------------------*/

    
    const reduxsetting = useSelector((state)=> state.data.setting);
    const darkModeOn = (reduxsetting["darkMode"] == "true") ? "activated" : "";


    /*---------------------------------*/

    const [viewType, setviewType] = useState("Day");
    const changeview = (e) => {
        setviewType(e.target.value)
    }

    return (
        <div>
            <div className="cal-nav">
                <h1>Calendar</h1>
                <select  defaultValue="Day" id="changecalendarviewtype"  onChange={changeview}>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                </select>
            </div>
            <div className="calview">
                {(()=>{switch(viewType) {
                    case "Day": return (<Day rerenderStatus={rerenderStatus} />);
                    case "Week": return (<Week rerenderStatus={rerenderStatus} />);
                    case "Month": return (<Month rerenderStatus={rerenderStatus} />);
                }})()}
            </div>
        </div>
    )
}

export default Calendar;