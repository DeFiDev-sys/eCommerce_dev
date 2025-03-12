import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/Projects";
import cart from "./slices/CartSlice";

const reducer = combineReducers({ products, cart });

export default configureStore({ reducer });
