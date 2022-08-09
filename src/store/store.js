import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";

// import logger from "redux-logger";
// logger is optional to use, it helps to see what state looks like before action is dispached ,what action was dispatched, and   what state looks like after the aciton is dispatched to reducer
// lets use logger as middleware

import { rootReducer } from "./root.reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("action type", action.type);
  console.log("action payload", action.payload);
  console.log(
    "currentState(state before action was dispatched to reducers)",
    store.getState()
  );

  next(action); // sending/dispatching action to next middleware if present or to reducers if no next middleware is present

  console.log(
    "nextState(state after action was dispatched to reducers)",
    store.getState()
  );
};

const middlewares = [loggerMiddleware]; // middleware is something that receives action before it is sent to reducers // can use multiple middleware as well as element of middlewares array
const composedEnhancers = compose(applyMiddleware(...middlewares)); // a middleware is a type of store enhancer among many, enhancers enhances the store

export const store = createStore(
  rootReducer, // necessary parameter => the combination of all reducers ,ie it is what makes store storing the states returned of all reducers
  undefined, // optional parameter=> default state in store , if necessary h for now we dont need it so used undefined
  composedEnhancers // optional parameter => here used middleware
);
