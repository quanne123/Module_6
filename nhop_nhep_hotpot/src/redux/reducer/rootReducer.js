import { combineReducers } from "redux";
import cartDetailReducer from "../reducer/CartDetail/cartDetailReducer";
import userDetailReducer from "./UserDetail/userDetailReducer";
export const rootReducer = combineReducers({
    cartDetails: cartDetailReducer,
    userDetail: userDetailReducer,

});
