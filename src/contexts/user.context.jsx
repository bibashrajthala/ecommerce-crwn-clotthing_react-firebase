import { createContext, useReducer, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  // initially , this state = INITIAL_STATE used in useReducer() hook  in which this userReducer is used and has dispatched action to it
  // console.log("dispatched");
  // console.log(action);

  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      // return the updated state (whenever reducer returns the state by updating it, it rerenders whole component here, context provider component from where the action of its type was dispatched )
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`unhandled action type ${type} in userReducer`);
    // or
    // return state;
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // using useReducer()  instead of useStates()
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  //or, directly
  // const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // console.log(currentUser);

  // action generator/dispatcher => dispatches action and triggers the reducers with that action
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
