import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import auth from "./auth";

const initialState = {};

const rootReducer = combineReducers({
  auth
});

const initializeStore = (preloadedState = initialState) => {
  return configureStore({
    reducer: rootReducer
  });
};

export default initializeStore;
