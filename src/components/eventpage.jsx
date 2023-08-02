import { useDispatch, useSelector } from "react-redux";
import { removeitem, additem, newgroupsetting } from "../redux/datastore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSquareFull } from "react-icons/fa"
import CreatableSelect from 'react-select/creatable';

const EventPage = ({ item }) => {

    

    let {title, date, note, group, id} = item;

    const [editTitle, changeEditTitle] = useState(title);
    const [editNote, changeEditNote] = useState(note);
    const [editDate, changeEditDate] = useState(date);
    const [editGroup, changeEditGroup] = useState(group);
    const goback = useNavigate();
    const dispatch = useDispatch();

    const reduxsetting = useSelector((state)=> state.data.setting);
    
    let groupsinsetting = (new Object(reduxsetting)).group.map(i=>i.name);
    let color = "";
    if (groupsinsetting.indexOf(editGroup) != -1) {
        color = reduxsetting.group[groupsinsetting.indexOf(editGroup)].color;
    } else {
        color = "#2D4356";
    }
    const blackandwhite = 0.299*parseInt(color.substring(1,3), 16)+0.587*parseInt(color.substring(3,5), 16)+0.114*parseInt(color.substring(5,7), 16)

    if (group=="") {
        group = "未分類";
    }

    
    let creatableoption = groupsinsetting.map((i)=> {
        return { value: i, label: i }
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
        dispatch(additem(
            {
                "id": id,
                "title": editTitle,
                "date": editDate,
                "note": editNote,
                "group": editGroup,
            }
        ))
        if (groupsinsetting.indexOf(editGroup) == -1) {
            dispatch(newgroupsetting(
                {
                    "name": editGroup,
                    "color": "#2D4356"
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
                                    <button onClick={()=>{goback(-1)}}>返回</button>
                                    <button onClick={()=>changeEditmode(true)}>Edit</button>
                                </div>                                
                                <input className="title" type="text" value={title} readOnly />
                                <p>{"ID: "+id}</p>
                                <div id="forthline">
                                    <input className="date" type="date" value={date} readOnly />
                                    <a style={{color: color}}><FaSquareFull /></a>
                                    <input className="group" type="text" value={group} readOnly  />
                                </div>
                                <div id="note" contenteditable>
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
                                        }} >
                                        放棄更改
                                    </button>
                                    <button onClick={()=>{
                                        changeEditmode(false);
                                        savechange();
                                    }}>儲存</button>
                                    <button onClick={()=>{
                                        dispatch(removeitem({
                                            "id": id
                                        }));
                                        goback(-1);
                                    }}>刪除</button>
                                </div>                                
                                <input className="title" type="text" value={editTitle} onChange={(e)=>changeEditTitle(e.target.value)} />
                                <p>{"ID: "+id}</p>
                                <div id="forthline">
                                    <input className="date" type="date" value={editDate} onChange={(e)=>changeEditDate(e.target.value)} />
                                    <a style={{color: color}}><FaSquareFull /></a>
                                    <input className="group" type="text" value={editGroup} onChange={(e)=>changeEditGroup(e.target.value)} />
                                    <CreatableSelect isClearable options={creatableoption} defaultInputValue={editGroup} onChange={(e)=>changeEditGroup((e == null ? "" : e.value))}  />
                                </div>
                                <div id="note" contenteditable>
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