import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/Projects";
import cart from "./slices/CartSlice";
import user from "./slices/UserSlice";

const reducer = combineReducers({ products, cart, user });

export default configureStore({ reducer });
