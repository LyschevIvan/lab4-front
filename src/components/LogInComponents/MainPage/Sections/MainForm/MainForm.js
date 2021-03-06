
import React, {useState} from "react";
import {checkPoint, set_R} from "../../../../../store/reducers/mainReducer";
import {connect} from "react-redux";
import {Button} from "primereact/button";
import {clearEntries} from "../../../../../store/reducers/tableReducer";
import {Slider} from "@material-ui/core";

const MainForm = (props) =>{

  const [action, setAction] = useState("check")
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);


  function onSubmit(e){
    e.preventDefault()
    if (action === "check")
    {
      props.checkPoint(x,y)
    }

    if (action === "clear"){
      props.clear()
    }
  }


  return(
    <form onSubmit={(event => onSubmit(event))}>
      <h5>R: {props.r}</h5>
      <Slider value={props.r} name ={"r"} id={"r"} onChange={(e,value ) => props.setR(value)} max={2} min={-2} step={0.5}/>
      <h5>X: {x}</h5>
      <Slider value={x} name ={"x"} onChange={(e,value) => setX(value)} max={2} min={-2} step={0.5}/>
      <h5>Y: {y}</h5>
      <Slider value={y} name ={"y"} onChange={(e,value) => setY(value)} max={props.y_max} min={props.y_min} step={0.5}/>
      <div className={"pt-3 d-flex justify-content-around"}>
        <Button className={""} type={"submit"} onClick={() => setAction("check")}>Проверить</Button>
        <Button type={"clear"} onClick={() => setAction("clear")} className={""}>Очистить</Button>
      </div>
    </form>

  )
}


function mapStateToProps(state){
  return{
    xValues : state.main.xValues,
    y_min : state.main.y_min,
    y_max : state.main.y_max,
    rValues : state.main.rValues,
    r : state.main.r
  }
}
function mapDispatchToProps(dispatch){
  return{
    checkPoint : (x,y) => dispatch(checkPoint(x,y)),
    setR : (r) => dispatch(set_R(r)),
    clear : () => dispatch(clearEntries())

  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(MainForm)
