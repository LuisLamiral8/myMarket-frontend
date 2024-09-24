import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { cartReducer } from "./cart.reducer";

const rootReducer = combineReducers({
  usuarioState: userReducer,
  cartState: cartReducer,
});

export default rootReducer;
