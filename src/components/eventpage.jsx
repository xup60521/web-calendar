import { useDispatch, useSelector } from "react-redux";
import { removeitem } from "../redux/datastore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSquareFull } from "react-icons/fa"

const EventPage = ({ item }) => {

    let {title, date, note, group, id} = item;
    const goback = useNavigate();

    const reduxsetting = useSelector((state)=> state.data.setting);
    
    let groupsinsetting = (new Object(reduxsetting)).group.map(i=>i.name);
    let color = "";
    if (groupsinsetting.indexOf(group) != -1) {
        color = reduxsetting.group[groupsinsetting.indexOf(group)].color;
    } else {
        color = "#2D4356";
    }
    const blackandwhite = 0.299*parseInt(color.substring(1,3), 16)+0.587*parseInt(color.substring(3,5), 16)+0.114*parseInt(color.substring(5,7), 16)

    if (group=="") {
        group = "未分類";
    }

    /*--------------*/

    const [editTitle, changeEditTitle] = useState(title);
    const [editNote, changeEditNote] = useState(note);
    const [editDate, changeEditDate] = useState(date);
    const [editGroup, changeEditGroup] = useState(group);

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
                                <div>
                                    <input className="date" type="date" value={date} readOnly />
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
                                    <button onClick={()=>changeEditmode(false)} >放棄更改</button>
                                    <button>儲存</button>
                                    <button>刪除</button>
                                </div>                                
                                <input className="title" type="text" value={editTitle}  />
                                <p>{"ID: "+id}</p>
                                <div>
                                    <input className="date" type="date" value={editDate}  />
                                    <input className="group" type="text" value={editGroup}   />
                                </div>
                                <div id="note" contenteditable>
                                    <textarea className="note" name="note" cols="30" rows="10" value={editNote} ></textarea>
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