import { useSelector, useDispatch } from "react-redux";
import Setting from "../setting/setting";
import { setsetting } from "../../redux/datastore";
import { NavLink } from "react-router-dom";


const Groupcell = ({ name, bcolor }) => {

    const dispatch = useDispatch();
    const reduxsetting = useSelector((state)=> state.data.setting);
    const blackandwhite = 0.299*parseInt(bcolor.substring(1,3), 16)+0.587*parseInt(bcolor.substring(3,5), 16)+0.114*parseInt(bcolor.substring(5,7), 16)
    const removegroupcolor = () => {
        let list = (new Array(reduxsetting.group)).flat().filter((i)=>i.name != name);
        let cacheobj = Object.assign({},reduxsetting);
        cacheobj.group = list.flat();
        dispatch(setsetting(cacheobj));
    }

    

    return (
        
        <div className="groupcell" style={{backgroundColor: bcolor}}>
            <NavLink to={`/Group/name="${name}"`} style={{ textDecoration: 'none', color: (blackandwhite > 180 ? "black" : "white") }} >
                <p>{name}</p>
                <p>{bcolor}</p>
            </NavLink>
            <button className="delete" onClick={removegroupcolor}>刪除</button>
        </div>
        
    )
}

export default Groupcell;