import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeitem } from "../../redux/datastore";

const Item = ({id, note, date, title, rerenderStatus, group }) => {

    const dispatch = useDispatch();
    const reduxsetting = useSelector((state)=> state.data.setting);
    
    function deleteItem() {

        if (window.confirm("確定刪除？")) {
            dispatch(removeitem(({
                "id": id
            })))
            rerenderStatus.current = true;
        } else {
            return ;
        }
    }

    let dict = {};
    reduxsetting.group.map((i)=>{
      dict[i.id] = i.name;
    })

    let groupsinsetting = (new Object(reduxsetting)).group.map(i=>i.id);
    let color = "";
    if (groupsinsetting.indexOf(group) != -1) {
        color = reduxsetting.group[groupsinsetting.indexOf(group)].color;
    } else {
        color = "#2D4356";
    }

    

    const blackandwhite = 0.299*parseInt(color.substring(1,3), 16)+0.587*parseInt(color.substring(3,5), 16)+0.114*parseInt(color.substring(5,7), 16)
    
    
  
    return (
    
        <div className="item" style={{backgroundColor: color }}>
            <NavLink to={"/"+id} style={{ textDecoration: 'none' }} >
            <div className="content" style={{color: (blackandwhite > 180 ? "black" : "white")}}>
                <p className="item title">{title}</p>
                <div>
                    <p className="item date">{date+" "+(dict[group] != null ? dict[group] : "未分類")}</p>
                </div>
                <p className="item note">{note}</p>
            </div>
            </NavLink>
            <button onClick={deleteItem} className="delete">刪除</button>
        </div>
    
        
    )
}

export default Item;