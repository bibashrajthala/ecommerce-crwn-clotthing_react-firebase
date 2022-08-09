import { combineReducers } from "redux";

// in context api,  only the reducer assoicated with useReducerHook() was called on the corresponding dispatched
// But in redux, each action dispatced from the components are dispathced to each reducer in the app, so instead of throwing error in default: of switch(), we return initial state in default case and that reducer wont update state as it is returning same state in memory,and only the reducer with the case matched to aciton dispatched updates state , and component using that updating state from that particular reducer re-renders

// combine all reducers , passed as an object (key=slice,value=reducer function, can name key and value same as well, it is upto you)

import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({ user: userReducer });
