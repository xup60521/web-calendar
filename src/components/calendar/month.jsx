import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import MonthCell from "./monthcell";

const Month = ({ data, setData, rerenderStatus, settingprofile }) => {

    let currentDate = new Date();

    const [selectmonthMonth, setselectmonthMonth] = useState(new Number(currentDate.getMonth()+1));
    const changemonth_month = (e) => {
        setselectmonthMonth(e.target.value);
    };

    const [selectmonthYear, setselectmonthYear] = useState(new Number(currentDate.getFullYear()));
    const changemonth_year = (e) => {
        setselectmonthYear(e.target.value);
    }

    const nextMonth = () => {
        if (selectmonthMonth <= 11 & selectmonthMonth >= 1) {
            setselectmonthMonth((prev) => prev+1);
        } else if (selectmonthMonth == 12) {
            setselectmonthYear((prev)=> prev+1);
            setselectmonthMonth(1);
        } else {
            setselectmonthMonth(12);
        };
    }

    const prevMonth = () => {
        if (selectmonthMonth <= 12 & selectmonthMonth >= 2) {
            setselectmonthMonth((prev) => prev-1);
        } else if (selectmonthMonth == 1) {
            setselectmonthYear((prev) => prev-1);
            setselectmonthMonth(12);
        } else {
            setselectmonthMonth(1);
        };
    }

    const daysinamonth = new Date(selectmonthYear, selectmonthMonth, 0).getDate();
    let firstdayinamonth = new Date(selectmonthYear,selectmonthMonth-1,1);

    let datelist = Array.from({length: daysinamonth}, (_, i) => i + 1);
    for (let i=0;i<firstdayinamonth.getDay();i++) {
        datelist.unshift(undefined);
    }

    // Cell

    

    return (
        <div className="monthcontainer">
            <div className="caltop">
                <button onClick={prevMonth} className="changemonth"><AiOutlineDoubleLeft/></button>
                <div className="changemonthcontainer">
                    <input className="changemonth" type="number" value={selectmonthYear} onChange={changemonth_year} />
                    <input className="changemonth" type="text" value={selectmonthMonth} onChange={changemonth_month} />
                </div>
                <button onClick={nextMonth} className="changemonth"><AiOutlineDoubleRight/></button>
            </div>
            <div className="calshowweek">
                <p id="week">星期天</p>
                <p id="week">星期一</p>
                <p id="week">星期二</p>
                <p id="week">星期三</p>
                <p id="week">星期四</p>
                <p id="week">星期五</p>
                <p id="week">星期六</p>
            </div>
            <div className="monthdisplay">
            {datelist.map((d,i)=>{
                return (<div className="cellcontainer" id={d}>
                        <p className="celldate">{d}</p>
                        <MonthCell selectmonthMonth={selectmonthMonth} selectmonthYear={selectmonthYear} data={data} setData={setData} rerenderStatus={rerenderStatus} date={d} settingprofile={settingprofile} />
                    </div>)
                })}
            </div>
            
        </div>
    )
};

export default Month;