import {SET_R, SET_X, SET_Y, STATUS_OK} from "../types";
import {pointAPI} from "../../api/pointAPI";
import {addPoint} from "./tableReducer";



export default function mainReducer(state = {
  xValues : [-2,-1.5,-1,-0.5,0,0.5,1,1.5,2],
  y_min : -5,
  y_max : 5,
  rValues : [-2,-1.5,-1,-0.5,0,0.5,1,1.5,2],
  r : 1
}, action){
  switch (action.type){
    case SET_R: return Object.assign({},state,{r : action.value});


    default: return state
  }
}
export function set_R(value){
  return {type: SET_R, value}
}


export const checkPoint = (x,y)=> (dispatch, getState) => {
    pointAPI.checkPoint(
      x,
      y,
      getState().main.r,
      getState().auth.loggedUser
    ).then(r => {
      if (r.status === 200 && r.data.status === STATUS_OK) {
        dispatch(addPoint(r.data.last_point))
      } else {
        alert(r.data.message)
      }

    }).catch(reason => {
      alert(reason)
    })

}
