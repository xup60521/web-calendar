import { useEffect, useState } from "react";

const Data = ({ data, setData, settingprofile, setsettingprofile, rerenderStatus, colorstatus }) => {
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
        if (colorstatus.current == true) {
            localStorage.setItem("setting", JSON.stringify(settingprofile));
            colorstatus.current = false;
        }
    }, [settingprofile]);


    const [InputData, setInputData] = useState("");
    const DataInput = (e) => {
        let reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = (i) => {
            setInputData(JSON.parse(i.target.result));    
        }
    }

    const [InputProfile, setInputProfile] = useState("");
    const ProfileInput = (e) => {
        let reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = (i) => {
            setInputProfile(JSON.parse(i.target.result));    
        }
    }

    const replacedata = () => {
        rerenderStatus.current = true;
        setData(InputData.posts);
    }

    const replaceprofile = () => {
        colorstatus.current = true;
        setsettingprofile(InputProfile)
        let cachesetting = new Object(settingprofile);
        localStorage.setItem("setting", JSON.stringify(cachesetting));
    }

    const mergedata = () => {
        rerenderStatus.current = true;
        setData((prev)=>{
            return [
                ...(InputData.posts),
                ...prev,
            ]
        })
    }

    const mergeprofile = () => {
        colorstatus = true;
        
        let inputlist = InputProfile.group.map((i)=>i.name);
        let buf = (new Object(settingprofile)).group.filter((i)=>inputlist.includes(i.name)==false);
        setsettingprofile({
            "group": [
                ...(InputProfile.group),
                ...buf,
            ]
        })
    }

    return (
        <div className="app">
            <div className="importpage">
                <h1>資料管理</h1>
                <div className="importcontainer">
                    <div id="import">
                        <h3>匯入資料</h3>
                        <input type="file" accept=".json, .csv" onChange={DataInput} />
                        {(()=>{
                            if (Array.isArray(InputData["posts"])) {
                                return (
                                    <div className="inputbuttoncontainer">
                                        <button className="datainputbutton" onClick={replacedata}>取代</button>
                                        <button className="datainputbutton" onClick={mergedata}>合併</button>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                    <div id="import">
                        <h3>匯入設定檔</h3>
                        <input type="file" accept=".json, .csv" onChange={ProfileInput} />
                        {(()=>{
                            if (InputProfile != "") {
                                return (
                                    <div className="inputbuttoncontainer">
                                        <button className="profileinputbutton" onClick={replaceprofile}>取代</button>
                                        <button className="profileinputbutton" onClick={mergeprofile}>合併</button>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                    <div>
                        <h3>匯出資料</h3>
                        <a
                            id="export"
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                            JSON.stringify(data)
                            )}`}
                            download="data.json"
                        >
                            {`Download Json`}
                        </a>
                    </div>
                    <div>
                        <h3>匯出設定檔</h3>
                        <a
                            id="export"
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                            JSON.stringify(settingprofile)
                            )}`}
                            download="profile.json"
                        >
                            {`Download Json`}
                        </a>
                    </div>
                </div>
                <div className="space"></div>
            </div>
        </div>
    )
}

export default Data;