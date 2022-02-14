import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  userReducer,
  orderReducer
});

export default rootReducer;