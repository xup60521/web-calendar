import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setsetting } from "../../redux/datastore";

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
    const [selectedgroup, setselectedgroup] = useState("");
    let groupinsetting = cachesetting.group.map((d)=>d.name);
    const ChangeGroup = (e) => {
        setselectedgroup(e.target.value);
    }

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
                <h3 id="groupsetting">Edit Color</h3>
                <div className="changecolor">
                    <input list="grouplist" id="changegroup" value={selectedgroup} onChange={ChangeGroup} />
                    <datalist id="grouplist">
                    {grouplist.map((d)=> {
                        return (
                            <option value={d} />
                        )
                    })}
                    </datalist>
                    <input type="color" id="inputcolor" value={color} onChange={Changecolor} />
                </div>
                {JSON.stringify(reduxsetting)}
            </div>
        </div>
    )
};

export default GroupSetting;