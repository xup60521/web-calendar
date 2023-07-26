import { useState, useEffect } from "react";
import Month from "./month";
import Day from "./day";
import Week from "./week";

const Calendar = ({ data, setData, rerenderStatus, settingprofile }) => {

    /*---------------------------------*/

    useEffect(()=> {
        if (localStorage.getItem("user") != null) {
            setData(JSON.parse(localStorage.getItem("user")).posts)
        }
    }, ["a"])

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

    /*---------------------------------*/

    const [viewType, setviewType] = useState("Month");
    const changeview = (e) => {
        setviewType(e.target.value)
    }

    return (
        <div>
            <div className="cal-nav">
                <h1>Calendar</h1>
                <select defaultValue="Month" id="changecalendarviewtype"  onChange={changeview}>
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