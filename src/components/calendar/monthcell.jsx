import { useState } from "react";
import Popup from "reactjs-popup";
import { useSelector } from "react-redux";


const MonthCell = ({ rerenderStatus, selectmonthMonth, selectmonthYear, date }) => {

    const reduxdata = useSelector((state)=> state.data.list);
    const reduxsetting = useSelector((state)=> state.data.setting);

    let monthdata = Array.from(reduxdata);
    const whatdateisit = (new String(selectmonthYear))+"-"+(new String(selectmonthMonth).padStart(2, "0"))+"-"+(new String(date)).padStart(2, "0");
    monthdata = monthdata.filter(d => d.date == (whatdateisit));
    const [open, setOpen] = useState(false);  
    const closeModal = () => setOpen(false);
    let groupsinsetting = (new Object(reduxsetting)).group.map(i=>i.id);
    const [item,setItem] = useState({})

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.id] = i.name;
    })

    return (
        <div className="cell">
            {monthdata.map((d)=>{
                let group = d.group;
                let color = "";
                if (groupsinsetting.indexOf(group) != -1) {
                    color = reduxsetting.group[groupsinsetting.indexOf(group)].color;
                } else {
                    color = "#2D4356";
                }
                return <div className="calendarmonthcolorbar" id={d.id} style={{backgroundColor: color}} onClick={() => {
                    setOpen(o => !o);
                    setItem(d);
                }} >
                </div>
            })}
            {(()=>{
                    let color = "";
                    let group = item.group;
                    if (groupsinsetting.indexOf(group) != -1) {
                        color = reduxsetting.group[groupsinsetting.indexOf(group)].color;
                    } else {
                        color = "#2D4356";
                    };
                    return (
                        <Popup open={open} closeOnDocumentClick onClose={closeModal} >
                            <div className="modal" id="calendarweekclickevent" style={{border: `2px solid ${color}`}}>
                                <p className="item title">{item.title}</p>
                                <p className="item date">{item.date+" "+dict[item.group]}</p>
                                <p className="item note">{item.note}</p>
                            </div>
                        </Popup>
                    )
                })()}
        </div>);
}

export default MonthCell;