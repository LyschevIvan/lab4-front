import {SET_LOGGED, SET_SERVER_ERROR, STATUS_OK} from "../types";
import authAPI from "../../api/authAPI";
import store from "../store";
import {getEntries} from "./tableReducer";

const initValues = {
  loggedUser: "",
  serverError : ""
}

export default function authReducer(state = {
  loggedUser: "",
  serverError : ""
}, action = {}){
  switch (action.type){
    case SET_LOGGED: return Object.assign({},state,{loggedUser : action.value});
    case SET_SERVER_ERROR : return Object.assign({},state,{serverError : action.value});
    default: return state;
  }
}

export function setLoggedUser(value){
  return {type : SET_LOGGED, value:value}
}

export function setServerError(value){
  return {type : SET_SERVER_ERROR , value:value}
}

export const initializeAuth = () => (dispatch) => {
  let currentUser = localStorage.getItem('token');
  if (currentUser !== null) {
    dispatch(setLoggedUser(currentUser))
    dispatch(getEntries());
  }
}

export const login = (username , password) => (dispatch) => {
  authAPI.doAuth(username,password).then(response => {
      if (response.status === 200){

        if (response.data.status === STATUS_OK){
          localStorage.setItem('token', response.data.key);
          dispatch(setLoggedUser(response.data.key))
          dispatch(getEntries())

        }
        else {
          dispatch(setServerError(response.data.message))
        }


      }
      else {
        dispatch(setServerError(response.data.message))
      }
    }).catch(()=>{dispatch(setServerError("Сервер недоступен"))})
}

export const register = (username, password) => (dispatch) => {
  authAPI.doRegister(username, password)
    .then(response => {
      if (response.status === 200) {
        if (response.data.status === STATUS_OK){
          dispatch(login(username, password));
        }
        else {
          dispatch(setServerError(response.data.message))
        }

      } else {
        dispatch(setServerError('Register failed'))

      }
    })
    .catch(error => {
      dispatch(setServerError('Server error'))

    });
}

export const logout = () => (dispatch) => {
  authAPI.doLogout(localStorage.getItem('token')).then(response =>{

  })
  localStorage.removeItem('token');
  dispatch(setLoggedUser(""))
}


