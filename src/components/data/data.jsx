import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { additem, replaceitem, setsetting } from "../../redux/datastore";

const Data = ({ rerenderStatus, colorstatus }) => {
    
    const dispatch = useDispatch();
    const reduxdata = useSelector((state)=> state.data.list);
    const reduxsetting = useSelector((state)=> state.data.setting);

    /*---------------------------------*/

    

    /*---------------------------------*/


 

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
        dispatch(replaceitem(InputData));
    }

    const replaceprofile = () => {
        colorstatus.current = true;
        
        dispatch(setsetting(InputProfile))
    }

    const mergedata = () => {
        rerenderStatus.current = true;
        dispatch(additem((InputData)))
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
                            if (Array.isArray(InputData)) {
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
                            JSON.stringify(reduxdata)
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
                            JSON.stringify(reduxsetting)
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