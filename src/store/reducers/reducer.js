import {combineReducers} from "redux";
import authReducer from "./authReducer";
import mainReducer from "./mainReducer";
import tableReducer from "./tableReducer";

export const reducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  table: tableReducer
});
