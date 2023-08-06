import { BsSunFill, BsFillMoonFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { setsetting } from "../../redux/datastore";

const Setting = () => {

    const reduxsetting = useSelector((state)=> state.data.setting);
    const dispatch = useDispatch();

    const DarkModeOn = () => {
        let cachesetting = JSON.parse(localStorage.getItem("setting"));
        cachesetting["darkMode"] = "true";
        dispatch(setsetting(cachesetting));
    }
    const DarkModeOff = () => {
        let cachesetting = JSON.parse(localStorage.getItem("setting"));
        cachesetting["darkMode"] = "false";
        dispatch(setsetting(cachesetting));
    }

    

    return (
        <div>
            <h1>Setting</h1>
            <div className="toggledarkmode">
                <p>Dark Mode</p>
                <div id="wrapbutton">
                    <button className={"defaultbutton toggledarkmode "+(reduxsetting["darkMode"]=="true" ? "toggleDarkModeActive" : "")} id="left" onClick={DarkModeOff} ><BsSunFill /></button>
                    <button className={"defaultbutton toggledarkmode "+(reduxsetting["darkMode"]=="true" ? "toggleDarkModeActive" : "")} id="right" onClick={DarkModeOn} ><BsFillMoonFill /></button>
                </div>
            </div>
        </div>
    )
}

export default Setting;