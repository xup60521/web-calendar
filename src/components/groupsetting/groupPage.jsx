import { useDispatch, useSelector } from "react-redux";
import { removeitem, setsetting, replaceitem } from "../../redux/datastore";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSquareFull } from "react-icons/fa"

const GroupPage = ({setting}) => {

    const {name, color, id} = setting;
    const [editmode, changeEditmode] = useState(false);
    const dispatch = useDispatch();
    const goback = useNavigate();
    const reduxdata = useSelector((state)=>state.data.list);
    const reduxsetting = useSelector((s)=>s.data.setting);

    const [editName, changeEditName] = useState(name);
    const [editColor, changeEditColor] = useState(color);

    const resetstate = () => {
        changeEditName(name);
        changeEditColor(color);
    }

    

    let grouplist = reduxsetting.group.map((item)=>   item.name    );
    let groupset = new Set();
    grouplist.forEach(element => {
        groupset.add(element);
    });
    reduxdata.forEach((e)=>{
        groupset.add(e.group);
    })

    let cachedata = (new Array(reduxdata)).flat().filter(item => item["group"] == setting.id).flat();

    const saveChange = () => {
        let cacheprofile = JSON.parse(localStorage.getItem("setting"));
        let idlist = cacheprofile.group.flat().map((i)=>{return i.id});
        cacheprofile.group = cacheprofile.group.flat();
        cacheprofile.group[idlist.indexOf(setting.id)].name = editName;
        cacheprofile.group[idlist.indexOf(setting.id)].color = editColor;
        dispatch(setsetting(cacheprofile));
        changeEditmode(false);
    }

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.name] = i.id;
    })
    
    const deletegroup = () => {

        if (window.confirm("確定刪除？")) {

            let list = (new Array(reduxsetting.group)).flat().filter((i)=>i.id != id);
            let cacheobj = Object.assign({},reduxsetting);
            cacheobj.group = list.flat();
            dispatch(setsetting(cacheobj));

            let cachedata = (new Array(reduxdata)).flat().map((i)=>{
                if (i.group == id) {
                    return {
                        "id": i.id,
                        "title": i.title,
                        "date": i.date,
                        "note": i.note,
                        "group": dict[""],
                    }
                } else {
                    return i;
                }
            });
            dispatch(replaceitem(cachedata));
            goback(-1);

        } else {
            return ;
        }   
             
    }

    return (
    <div className="groupPage">
        {(()=>{
            switch (editmode) {
                case false: {
                    return (
                        <div className="groupPagecontainer">
                            <div>
                                <button className="defaultbutton" onClick={()=>{goback(-1)}}>返回</button>
                                <button className="defaultbutton" onClick={()=>changeEditmode(true)}>Edit</button>
                            </div>
                            <div id="top">
                                <input type="color" id="groupcolor" value={color} disabled />
                                <input type="text" id="groupname" value={name} readOnly />
                            </div>
                            <div className="groupitemcontainer">
                                {cachedata.flat().map((item, i)=>{
                                    return (
                                    <div className="groupitem">
                                        <NavLink to={`/${item.id}/`} style={{color: "none"}}>
                                            <h3>{item.title}</h3>
                                            <h5>{item.date}</h5>
                                        </NavLink>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
                case true: {
                    return (
                        <div className="groupPagecontainer">
                            <div>
                                <button onClick={()=>{
                                    changeEditmode(false);
                                    resetstate();
                                }}
                                className="defaultbutton">
                                    放棄更改
                                </button>
                                <button onClick={()=>{saveChange()}} className="defaultbutton">儲存</button>
                                <button onClick={()=>{deletegroup()}} className="defaultbutton">刪除群組</button>
                            </div>
                            <div id="top">                                
                                <input type="color" id="groupcolor" value={editColor} onChange={(e)=>{changeEditColor(e.target.value)}} />
                                <input type="text" id="groupname" value={editName} onChange={(e)=>{changeEditName(e.target.value)}} />
                            </div>
                        </div>
                    )
                }
            }
        })()}
    </div>
    )
}

export default GroupPage