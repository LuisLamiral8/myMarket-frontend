import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";

const rootReducer = combineReducers({
  usuarioState: userReducer,
});

export default rootReducer;
