export const createAction = (type, payload) => ({ type, payload });

// you can further optimize it by using the each reducer functions and INITIAL_STATE used in useReducer() of different contexts file to diffrent reducer file inside of reducer folder and then import them to their to their corresponding context file
