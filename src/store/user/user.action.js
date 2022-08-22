import { createAction } from "../../utils/reducers/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// export const USER_ACTION_TYPES = {
//   SET_CURRENT_USER: "user/SET_CURRENT_USER",
//   CHECK_USER_SESSION: "user/ CHECK_USER_SESSION",
//   GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
//   EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
//   SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
//   SIGN_IN_FAILED: "user/SIGN_IN_FAILED",
// };

// user action creater
// action generator that returns/create action to be dispathced by components
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
