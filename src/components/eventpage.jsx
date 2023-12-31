import { useDispatch, useSelector } from "react-redux";
import { removeitem, additem, newgroupsetting } from "../redux/datastore";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSquareFull } from "react-icons/fa"
import CreatableSelect from 'react-select/creatable';
import { v4 } from "uuid";

const EventPage = ({ item }) => {

    

    let {title, date, note, group, id} = item;

    const [editTitle, changeEditTitle] = useState(title);
    const [editNote, changeEditNote] = useState(note);
    const [editDate, changeEditDate] = useState(date);
    const [editGroup, changeEditGroup] = useState(group);
    const goback = useNavigate();
    const dispatch = useDispatch();

    const reduxsetting = useSelector((state)=> state.data.setting);

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.id] = i.name;
    })

    let name2id = {};
    reduxsetting.group.map((i)=>{
        name2id[i.name] = i.id;
    })
    
    let groupsinsetting = (new Object(reduxsetting)).group.map(i=>i.id);
    let color = "";
    if (groupsinsetting.indexOf(editGroup) != -1) {
        color = reduxsetting.group[groupsinsetting.indexOf(editGroup)].color;
    } //非id，為name
    else if (name2id[editGroup] != null) {
        color = reduxsetting.group[groupsinsetting.indexOf(name2id[editGroup])].color;
    }
    else {
        color = "#2D4356";
    }
    const blackandwhite = 0.299*parseInt(color.substring(1,3), 16)+0.587*parseInt(color.substring(3,5), 16)+0.114*parseInt(color.substring(5,7), 16)

    if (group=="") {
        group = "未分類";
    }

    
    let creatableoption =reduxsetting.group.map((i)=> {
        return { value: i.id, label: i.name }
    })

    

    /*--------------*/

    

    const resetstate = () => {
        changeEditTitle(title);
        changeEditNote(note);
        changeEditDate(date);
        changeEditGroup(group);
    }

    const savechange = () => {
        dispatch(removeitem({
            "id": id
        }));
        
        if (groupsinsetting.indexOf(editGroup) == -1 & name2id[editGroup] == null) {
            let uuid = v4()
            dispatch(newgroupsetting(
                {
                    "name": editGroup,
                    "color": "#2D4356",
                    "id": uuid,
                }
            ));
            dispatch(additem(
                {
                    "id": id,
                    "title": editTitle,
                    "date": editDate,
                    "note": editNote,
                    "group": uuid,
                }
            ))
        } else {
            dispatch(additem(
                {
                    "id": id,
                    "title": editTitle,
                    "date": editDate,
                    "note": editNote,
                    "group": (editGroup == "" ? name2id[editGroup] : editGroup),
                }
            ))
        }
        
    }

    /*--------------*/

    const [editmode, changeEditmode] = useState(false);

    return (
        <div className="fullheight">
            {(()=>{
                switch (editmode) {
                    case false:{
                        return (
                            <div className="eventpagecontainer">
                                <div>
                                    <button onClick={()=>{goback(-1)}} className="defaultbutton">返回</button>
                                    <button onClick={()=>changeEditmode(true)} className="defaultbutton">Edit</button>
                                </div>                                
                                <input className="title" type="text" value={title} readOnly />
                                <p>{"ID: "+id}</p>
                                <div id="forthline">
                                    <input className="date" type="date" value={date} readOnly />
                                    <a style={{color: color}}><FaSquareFull /></a>
                                    <NavLink to={`/Group/id="${group}"`}><input className="group" type="text" value={(dict[group] != null ? (dict[group] == "" ? "未分類" : dict[group]) : group)} readOnly  /></NavLink>
                                </div>
                                <div id="note">
                                    <textarea className="note" value={note} readOnly ></textarea>
                                </div>
                            </div>
                        )
                    }
                    case true: {
                        return (
                            <div className="eventpagecontainer">
                                <div>
                                    <button onClick={()=>{
                                        changeEditmode(false);
                                        resetstate();
                                        }}
                                        className="defaultbutton" >
                                        放棄更改
                                    </button>
                                    <button onClick={()=>{
                                        changeEditmode(false);
                                        savechange();
                                        }}
                                        className="defaultbutton">
                                        儲存
                                    </button>
                                    <button onClick={()=>{
                                        dispatch(removeitem({
                                            "id": id
                                        }));
                                        goback(-1);
                                        }}
                                        className="defaultbutton">
                                        刪除
                                    </button>
                                </div>                                
                                <input className="title" type="text" value={editTitle} onChange={(e)=>changeEditTitle(e.target.value)} />
                                <p>{"ID: "+id}</p>
                                <div id="forthline">
                                    <input className="date" type="date" value={editDate} onChange={(e)=>changeEditDate(e.target.value)} />
                                    <a style={{color: color}}><FaSquareFull /></a>
                                    <a><input className="group" type="text" value={(dict[editGroup] != null ? (dict[editGroup] == "" ? "未分類" : dict[editGroup]) : editGroup)} readOnly /></a>
                                </div>
                                <CreatableSelect isClearable options={creatableoption} defaultInputValue={editGroup} onChange={(e)=>changeEditGroup((e == null ? "" : e.value))}  />
                                <div id="note">
                                    <textarea className="note" name="note" cols="30" rows="10" value={editNote} onChange={(e)=>changeEditNote(e.target.value)}></textarea>
                                </div>
                            </div>
                        )
                    }
                }
            })()}
            
        </div>
        
    )
};

export default EventPage;