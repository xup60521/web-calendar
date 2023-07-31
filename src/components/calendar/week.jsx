import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import WeekCell from "./weekcell";

const Week = ({ rerenderStatus }) => {
    const currentDate = new Date();
    const [selectdateofaweek, setselectdateofaweek] = useState(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0") );
    const changeinputdate = (e) => {
        setselectdateofaweek(e.target.value);
    }

    const nextweek = () => {
        if (selectdateofaweek != "") {
            let dateobj = new Date(selectdateofaweek);
            dateobj.setDate(dateobj.getDate()+7);
            setselectdateofaweek(dateobj.getFullYear() + "-" + (new String(dateobj.getMonth()+1)).padStart(2, "0") + "-" + (new String(dateobj.getDate())).padStart(2, "0") );
        } else {
            setselectdateofaweek(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0"));
        }
    }

    const prevweek = () => {
        if (selectdateofaweek != "") {
            let dateobj = new Date(selectdateofaweek);
            dateobj.setDate(dateobj.getDate()-7);
            setselectdateofaweek(dateobj.getFullYear() + "-" + (new String(dateobj.getMonth()+1)).padStart(2, "0") + "-" + (new String(dateobj.getDate())).padStart(2, "0") );
        } else {
            setselectdateofaweek(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0"));
        }
    }

    /* week display */

    const firstdayofaweek = new Date(selectdateofaweek);
    firstdayofaweek.setDate(firstdayofaweek.getDate()-firstdayofaweek.getDay());
    let bufday = new Date(firstdayofaweek);
    let weeklist = [];

    for (let i=0;i<7;i++) {
        weeklist.push(bufday.getFullYear() + "-" + (new String(bufday.getMonth()+1)).padStart(2, "0") + "-" + (new String(bufday.getDate())).padStart(2, "0"));
        bufday.setDate(bufday.getDate()+1);
    }

    /*-----*/

    return (
        <div className="weekcontainer">
            <div className="caltop">
                <button className="changeweek" id="lastweek" onClick={prevweek} ><AiOutlineDoubleLeft/></button>
                <div className="changemonthcontainer">
                    <input className="changeweek" type="date" value={selectdateofaweek} onChange={changeinputdate} />
                </div>
                <button className="changeweek" if="nextweek" onClick={nextweek} ><AiOutlineDoubleRight/></button>
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
            <div className="weekdisplay">
                {weeklist.map((d, i)=> {
                    return (
                        <div className="calweekcontainer">
                            <p className="calweekdate">{(()=>{ 
                                return ((new String(new Number(d.split("-")[1])))+"/"+(new String(new Number(d.split("-")[2]))))
                            })()}</p>
                            <WeekCell date={d} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Week;