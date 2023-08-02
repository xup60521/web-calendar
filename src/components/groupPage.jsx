import { useDispatch, useSelector } from "react-redux";
import { additem, removeitem } from "../redux/datastore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSquareFull } from "react-icons/fa"

const GroupPage = ({setting}) => {

    const {name, color} = setting;
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

    return (
    <div className="groupPage">
        {(()=>{
            switch (editmode) {
                case false: {
                    return (
                        <div className="groupPagecontainer">
                            <div>
                                <button onClick={()=>{goback(-1)}}>返回</button>
                                <button onClick={()=>changeEditmode(true)}>Edit</button>
                            </div>
                            <div>
                                <input type="text" value={name} readOnly />
                                <input type="color" value={color} disabled />
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
                                }}>
                                    放棄更改
                                </button>
                                <button onClick={()=>{}}>儲存</button>
                                <button>刪除群組</button>
                            </div>
                            <div>
                                <input type="text" value={editName} onChange={(e)=>{changeEditName(e.target.value)}} />
                                <input type="color" value={editColor} onChange={(e)=>{changeEditColor(e.target.value)}} />
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