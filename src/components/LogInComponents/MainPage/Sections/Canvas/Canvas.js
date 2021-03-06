import {useEffect} from "react";
import {connect} from "react-redux";
import {clickCanvas, drawCanvas, drawPoints, getCoords} from "./canvasScripts";
import {checkPoint, set_R, set_X, set_Y} from "../../../../../store/reducers/mainReducer";

const Canvas = (props) =>{

  const onClick = ()=>{
    let [x,y] = getCoords(props.r_value)
    // props.setX(x)
    // props.setY(y)
    props.checkPoint(x,y)
  }

  useEffect(()=>{
    drawCanvas(props.r_value)
    drawPoints(props.points, props.r_value)
  })

  return(
      <canvas id="canvas" onClick={onClick}
              style={{backgroundColor: "#FFFFFF"}} width="300"
              height="300"/>
  )
}

export default connect((state)=>{
  return {
    r_value : state.main.r,
    points : state.table.points
  }
}, (dispatch)=>{
    return{
      checkPoint : (x,y) => dispatch(checkPoint(x,y))
      // setX: (x) => dispatch(set_X(x)),
      // setY: (y) => dispatch(set_Y(y))
    }
})(Canvas)

