import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      // return the updated state (whenever reducer returns the state by updating it, it rerenders whole component here, context provider component from where the action of its type was dispatched )
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
