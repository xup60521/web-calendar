import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setsetting } from "../../redux/datastore";
import Groupcell from "./groupcell";
import CreatableSelect from 'react-select/creatable';
import { v4 } from "uuid";

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

    let creatableoption =reduxsetting.group.map((i)=> {
        return { value: i.id, label: i.name }
    })
    

    const [selectedgroup, setselectedgroup] = useState("");
    let groupinsetting = cachesetting.group.map((d)=>d.id);

    const [rawgroup, setrawgroup] = useState({
        "name": undefined,
        "id": undefined,
    });

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.name] = i.id;
    })

    const [color, setcolor] = useState("#ffffff");

    const Changecolor = (e) => {
        setcolor(e.target.value);
        groupinsetting = cachesetting.group.map((d)=>d.id);
        let indexofgroup = groupinsetting.indexOf(selectedgroup);

        if (indexofgroup != -1) {
            cachesetting.group[indexofgroup].color = e.target.value;
        } 
        else if (rawgroup.name == selectedgroup) {
            groupinsetting = cachesetting.group.map((d)=>d.id);
            indexofgroup = groupinsetting.indexOf(rawgroup.id);
            cachesetting.group[indexofgroup].color = e.target.value;
            console.log("works")
        } 
        else if (indexofgroup == -1 & dict[selectedgroup] != null ) {
            cachesetting.group[groupinsetting.indexOf(dict[selectedgroup])].color = e.target.value;
        }
        else 
         {
            const uuid = v4()
            cachesetting.group.push({
                "name": selectedgroup,
                "color": e.target.value,
                "id": uuid,
            })
            setrawgroup({
                "name": selectedgroup,
                "id": uuid
            });
                
            
            creatableoption.push({ value: uuid, label: selectedgroup});
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
        setcolor(cachesetting.group.filter(i=>i.id==selectedgroup)[0].color);
        }
   },[selectedgroup])
   

    return (
        <div className="app">
            <div className="groupsetting">
                <h1>Group</h1>
                <h3 id="groupsetting">New / Edit</h3>
                <div className="changecolor">
                    <CreatableSelect isClearable options={creatableoption} onChange={(e)=>{setselectedgroup((e == null ? "" : e.value))}} />
                    <input type="color" id="inputcolor" value={color} onChange={Changecolor} />
                </div>
                <div className="groupcellcontainer">
                    {reduxsetting.group.map((item)=>{
                        return <Groupcell name={item.name} bcolor={item.color} id={item.id} />
                    })}
                </div>
            </div>
        </div>
    )
};

export default GroupSetting;