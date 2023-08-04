import { useState } from "react";
import { v4 } from "uuid"
import Item from "./item";
import { useDispatch, useSelector } from "react-redux";
import { additem, newgroupsetting } from "../../redux/datastore";
import CreatableSelect from 'react-select/creatable';

const NewEvent = ({ rerenderStatus }) => {

    const reduxdata = useSelector((state)=> state.data.list);
    const reduxsetting = useSelector((state)=> state.data.setting);
    const dispatch = useDispatch();

    /*------------------------------------*/ 

    const [title, setTitle] = useState("");
    function titleChange(e) {
        setTitle(e.target.value);
    }

    let currentDate = new Date();
    const [date, setDate] = useState(currentDate.getFullYear() + "-" + (new String(currentDate.getMonth()+1)).padStart(2, "0") + "-" + (new String(currentDate.getDate())).padStart(2, "0") );
    function dateChange(e) {
        setDate(e.target.value);
    }

    const [note, setNote] = useState("");
    function noteChange(e) {
        setNote(e.target.value);
    }

    const [group, setGroup] = useState("");
    const groupChange = (e) => {
        setGroup(e.target.value);
    }

    const [cachesettingstate, setcachesettingstate] = useState(new Object(reduxsetting));

    let cachesetting = new Object(cachesettingstate);
    let grouplist = reduxsetting.group.map((item)=>   item.id    );

    let creatableoption =reduxsetting.group.map((i)=> {
        return { value: i.id, label: i.name }
    })

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.name] = i.id;
    })
    /*------------------------------------*/ 

    const add = () => {
        if (title == "") {
            alert("請輸入標題")
            return 
        };

        
        setTitle("");
        setNote("");

        if (grouplist.indexOf(group) == -1 & dict[group] == null) {
            let uuid = v4();
            dispatch(newgroupsetting(
                {
                    "name": group,
                    "color": "#2D4356",
                    "id": uuid
                }
            ))
            dispatch(additem(
                {
                    id: v4(),
                    title,
                    date,
                    note,
                    "group": uuid,
                }
            ))
        }  else {
            dispatch(additem(
                {
                    id: v4(),
                    title,
                    date,
                    note,
                    "group": (group != ""? group : dict[group]),
                    
                }
            ))
        }

        console.log(grouplist)

        

        rerenderStatus.current = true;
    }



    /*------------------------------------*/ 

    let list = Array.from(reduxdata);
    list.sort((a,b)=> {
        let [ay,am,aday] = a.date.split("-");
        let [by,bm,bday] = b.date.split("-");
        return  new Date(ay,am,aday) - new Date(by,bm,bday);
    });

    /*------------------------------------*/ 

    return (
        <div className="newEvent">            
            <div className="newEvent-left">
                <h1>New Event</h1>
                <div className="inputsection">
                    <p id="title" className="edit">標題</p>
                    <input value={title} onChange={titleChange} type="text" id="title" className="edit" required/>
                    <p id="date" className="edit">日期</p>
                    <input value={date} onChange={dateChange} type="date" id="date" className="edit" required/>
                    <p id="note" className="edit">內容</p>
                    <textarea value={note} onChange={noteChange} type="text" id="note" className="edit"/>
                    <p id="group" className="edit">群組</p>
                    <CreatableSelect isClearable options={creatableoption} onChange={(e)=>{setGroup((e == null ? "" : e.value))}} />
                    <button type="submit" className="add" onClick={add}>新增</button>
                </div>
                <div></div>
            </div>
            <div className="item-list">
            {list.map((item) => {
                const { title, date, note, id, group} = item;
                return (
                    <Item 
                    key={id}
                    id={id}
                    title={title}
                    date={date}
                    note={note}
                    rerenderStatus={rerenderStatus}
                    group={group}
                    />
                )
            })}
        </div>
        </div>
    )
}

export default NewEvent;