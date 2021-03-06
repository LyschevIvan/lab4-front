import {ADD_POINT, CLEAR_POINTS, REMOVE_POINT, SET_ENTRIES, STATUS_FAILED, STATUS_OK} from "../types";
import {pointAPI} from "../../api/pointAPI";


const initState = {
  points : []
}
export default function tableReducer(state={
  points : []
} ,action){
  switch (action.type){
    case ADD_POINT : return {
      points : [...state.points, action.value]}
    case SET_ENTRIES: return {points: action.value}
    case CLEAR_POINTS : return {points: action.value}
    case REMOVE_POINT : return {points: action.value}

    default : return state;
  }
}

export function setEntries(value){
  return{
    type: SET_ENTRIES,
    value : value
  }
}

export function addPoint(id){
  return {
    type : ADD_POINT,
    value : id
  }
}
export function clearPoints(){
  return {
    type : CLEAR_POINTS,
    value : []
  }
}
function remPoint(value){
  return{
    type : REMOVE_POINT,
    value : value
  }
}


export const getEntries = () => (dispatch) => {pointAPI.getEntries(localStorage.getItem('token'))
      .then(response => {
        if (response.status === 200 && response.data.status === STATUS_OK) {
          dispatch(setEntries(response.data.points));
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert(error);
      })


}

export const clearEntries = () => (dispatch) => {
  pointAPI.clearPoints(localStorage.getItem('token')).then(response => {
    if(response.status === 200 && response.data.status === STATUS_OK){
      dispatch(clearPoints())
    }
    else {
      alert(response.data.message)
    }
  }).catch((error)=>{
    alert(error)
  })
}

export const removeEntry = (id) => (dispatch, getState) => {
    pointAPI.removePoint(localStorage.getItem('token'),id ).then(response => {
      if(response.status === 200 && response.data.status === STATUS_OK){
        let removed = getState().table.points.slice();
        let remId = removed.findIndex(item => item.id === id)
        removed.splice(remId,1)
        dispatch(remPoint(removed))

      }
      else {
        alert(response)
      }
    }).catch(error => alert(error))

}