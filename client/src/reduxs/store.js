import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/Projects";

const reducer = combineReducers({ products });

export default configureStore({ reducer });
