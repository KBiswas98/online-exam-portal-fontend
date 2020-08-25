import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";

const allReducer = combineReducers({ AuthReducers });
export default allReducer;
