import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useState } from "react";
import Item from "./item";

const Day = ({ data, setData, rerenderStatus, settingprofile }) => {
    let currentDate = new Date();
    const [selectdate, setselectdate] = useState(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0") );
    const changedate = (e) => {
        setselectdate(e.target.value);
    }

    const nextdate = () => {
        if (selectdate != "") {
            let dateobj = new Date(selectdate);
            dateobj.setDate(dateobj.getDate()+1);
            setselectdate(dateobj.getFullYear() + "-" + (new String(dateobj.getMonth()+1)).padStart(2, "0") + "-" + (new String(dateobj.getDate())).padStart(2, "0") );
        } else {
            setselectdate(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0"));
        }
    }

    const prevdate = () => {
        if (selectdate != "") {
            let dateobj = new Date(selectdate);
            dateobj.setDate(dateobj.getDate()-1);
            setselectdate(dateobj.getFullYear() + "-" + (new String(dateobj.getMonth()+1)).padStart(2, "0") + "-" + (new String(dateobj.getDate())).padStart(2, "0") );
        } else {
            setselectdate(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0"));
        }
    }

    return (
        <div className="datecontainer">
            <div className="selectDate">
                <button className="changedate" id="lastdate" onClick={prevdate} ><AiOutlineDoubleLeft/></button>
                <input className="changedate" type="date" value={selectdate} onChange={changedate} />
                <button className="changedate" id="nextdate" onClick={nextdate} ><AiOutlineDoubleRight/></button>
            </div>
            <div className="list">
                {data.filter(d => d.date == selectdate).map(
                    (item) => {
                        const { title, date, note, id, group} = item;
                        return (
                            <Item 
                            key={id}
                            id={id}
                            title={title}
                            date={date}
                            note={note}
                            setData={setData}
                            rerenderStatus={rerenderStatus}
                            group={group}
                            settingprofile={settingprofile}
                            />
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default Day;