import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";

// persist the redux reducers and redux store ie states using local storage(by default , you can change it in config though)
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import logger from "redux-logger";
// logger is optional to use, it helps to see what state looks like before action is dispached ,what action was dispatched, and   what state looks like after the aciton is dispatched to reducer
// lets use logger as middleware

import { rootReducer } from "./root.reducer";

// making our own middleware that logs action and state instead of using react-logger
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

  // each time a action is dipatched to reducers and a reducer update state( in rootreducer of) store,all the selectors get fired then only the code below next() will run then after that each component using useSelector() will also re-render as selector got fired again

  console.log(
    "nextState(state after action was dispatched to reducers)",
    store.getState()
  );
};

const middlewares = [loggerMiddleware]; // middleware is something that receives action before it is sent to reducers // can use multiple middleware as well as element of middlewares array
const composedEnhancers = compose(applyMiddleware(...middlewares)); // a middleware is a type of store enhancer among many, enhancers enhances the store

const persistConfig = {
  key: "root", // start persisting from root , ie persist everything
  storage, // storage: storage, by  default uses local storage of browser, can change though
  blacklist: ["user"], // include reducer(slice) whose state  that you dont want to persist here, user data is already persisted bt  firebase auth listener so no need to clash its persistance with redux persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // created a persisted root reducer(excluding the blaclisted reducers)

export const store = createStore(
  persistedReducer, // necessary parameter => the combination of all reducers(here used persisted one) ,ie it is what makes store storing the states returned of all reducers
  undefined, // optional parameter=> default state in store , if necessary h for now we dont need it so used undefined
  composedEnhancers // optional parameter => here used middleware
);

export const persistor = persistStore(store); // created a persited store

// need to provide this persisted store to our app in index.js
