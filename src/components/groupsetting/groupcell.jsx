import { useSelector, useDispatch } from "react-redux";
import { setsetting, newgroupsetting, replaceitem } from "../../redux/datastore";
import { NavLink } from "react-router-dom";
import { v4 } from "uuid";


const Groupcell = ({ name, bcolor, id }) => {

    const dispatch = useDispatch();
    const reduxsetting = useSelector((state)=> state.data.setting);
    const reduxdata = useSelector((state)=> state.data.list);
    const blackandwhite = 0.299*parseInt(bcolor.substring(1,3), 16)+0.587*parseInt(bcolor.substring(3,5), 16)+0.114*parseInt(bcolor.substring(5,7), 16)

    let dict1 = {};
    reduxsetting.group.map((i)=>{
      dict1[i.name] = i.id;
    })

    if (dict1[""]==null) {
        dispatch(newgroupsetting(
            {
                "name": "",
                "color": "#2D4356",
                "id": v4(),
            }
        ))
    }

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.name] = i.id;
    })

    const removegroupcolor = () => {

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


        } else {
            return ;
        }   
             
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