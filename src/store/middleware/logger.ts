import { Middleware } from "redux";
import { TRootState } from "../store";

// making our own middleware that logs action and state instead of using react-logger
export const loggerMiddleware: Middleware<{}, TRootState> =
  (store) => (next) => (action) => {
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

// you can use this instead of logger we are using from redux-logger
