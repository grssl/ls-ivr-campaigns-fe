import { combineReducers } from "redux";
import UserDataReducer from "./reducer/UserDataReducer";
const rootReducer = combineReducers({
  UserDataReducer,
});

export default rootReducer;
