import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setsetting } from "../../redux/datastore";
import Groupcell from "./groupcell";
import CreatableSelect from 'react-select/creatable';

const GroupSetting = ({ rerenderStatus, colorstatus }) => {

/*---------------------------------*/
    const reduxdata = useSelector((state)=> state.data.list);
    const reduxsetting = useSelector((state)=> state.data.setting);
    const dispatch = useDispatch();
    
    let aca = {"group":[]};
    if (JSON.parse(localStorage.getItem("setting")) != null) {
        aca = JSON.parse(localStorage.getItem("setting"));
    }
  
    const [settingprofile, setsettingprofile] = useState(aca);

    let cachesetting = new Object(settingprofile);
    let grouplist = reduxdata.map((item)=>   item.group    );
    let creatableoption = grouplist.map((i)=> {
        return { value: i, label: i }
    })

    

    const [selectedgroup, setselectedgroup] = useState("");
    let groupinsetting = cachesetting.group.map((d)=>d.name);

    const [color, setcolor] = useState("#ffffff");
    const Changecolor = (e) => {
        setcolor(e.target.value);
        let indexofgroup = groupinsetting.indexOf(selectedgroup);
        if (indexofgroup != -1) {
            cachesetting.group[indexofgroup].color = color;
        } else {
            cachesetting.group.push({
                "name": selectedgroup,
                "color": color,
            })
        }
    }

    

   useEffect(()=>{
        if (colorstatus.current == true) {
            setsettingprofile(cachesetting);
            localStorage.setItem("setting", JSON.stringify(cachesetting));
        }
        
        colorstatus.current = true;
        dispatch(setsetting(JSON.parse(localStorage.getItem("setting"))))
   }, [color])

   useEffect(()=>{
    if (groupinsetting.includes(selectedgroup)) {
        setcolor(cachesetting.group.filter(i=>i.name==selectedgroup)[0].color);
        }
   },[selectedgroup])
   

    return (
        <div className="app">
            <div className="groupsetting">
                <h1>Group Setting</h1>
                <h3 id="groupsetting">New / Edit</h3>
                <div className="changecolor">
                    <CreatableSelect isClearable options={creatableoption} onChange={(e)=>{setselectedgroup((e == null ? "" : e.value))}} />
                    <input type="color" id="inputcolor" value={color} onChange={Changecolor} />
                </div>
                <div className="groupcellcontainer">
                    {reduxsetting.group.map((item)=>{
                        return <Groupcell name={item.name} bcolor={item.color} />
                    })}
                </div>
            </div>
        </div>
    )
};

export default GroupSetting;