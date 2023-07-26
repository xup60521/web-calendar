import { useState, useEffect } from "react";

const GroupSetting = ({ data, setData, settingprofile, setsettingprofile, rerenderStatus, colorstatus }) => {

/*---------------------------------*/

    useEffect(()=> {
        if (localStorage.getItem("user") != null) {
            setData(JSON.parse(localStorage.getItem("user")).posts)
        }
    }, ["a"])

    useEffect(()=> {
        if (rerenderStatus.current == false) {
            return;
        } else {
            localStorage.setItem('user', JSON.stringify({
                "posts": data
            }));
            rerenderStatus.current = false; 
        }
    }, [data]);

    /*---------------------------------*/

    useEffect(()=>{
        if (localStorage.getItem("setting") != null ) {
            setsettingprofile(JSON.parse(localStorage.getItem("setting")));
        }
    },["a"])

    

    let cachesetting = new Object(settingprofile);
    let grouplist = data.map((item)=>   item.group    );
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
    
   }, [color, settingprofile])

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
                {JSON.stringify(settingprofile)}
            </div>
        </div>
    )
};

export default GroupSetting;