import { useState, useEffect } from "react";
import Month from "./month";
import Day from "./day";
import Week from "./week";

const Calendar = ({ data, setData, rerenderStatus, settingprofile, setsettingprofile }) => {

    /*---------------------------------*/

    
    



    /*---------------------------------*/

    const [viewType, setviewType] = useState("Day");
    const changeview = (e) => {
        setviewType(e.target.value)
    }

    return (
        <div>
            <div className="cal-nav">
                <h1>Calendar</h1>
                <select defaultValue="Day" id="changecalendarviewtype"  onChange={changeview}>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                </select>
            </div>
            <div className="calview">
                {(()=>{switch(viewType) {
                    case "Day": return (<Day data={data} setData={setData} rerenderStatus={rerenderStatus} settingprofile={settingprofile} />);
                    case "Week": return (<Week data={data} setData={setData} rerenderStatus={rerenderStatus} settingprofile={settingprofile} />);
                    case "Month": return (<Month data={data} setData={setData} rerenderStatus={rerenderStatus} settingprofile={settingprofile} />);
                }})()}
            </div>
        </div>
    )
}

export default Calendar;