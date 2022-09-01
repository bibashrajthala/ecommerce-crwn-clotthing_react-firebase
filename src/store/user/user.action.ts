import {
  createAction,
  withMatcher,
  TActionWithPayload,
  TActionWithoutPayload,
} from "../../utils/reducers/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {
  TUserData,
  TAdditionalInformation,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

// return types of each action creaters ie type of action returned by action creaters
export type TCheckUserSession =
  TActionWithoutPayload<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type TSetCurrentUser = TActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  TUserData
>;

export type TGoogleSignInStart =
  TActionWithoutPayload<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type TEmailSignInStart = TActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export type TSignInSuccess = TActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  TUserData
>;

export type TSignInFailed = TActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export type TSignUpStart = TActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;

export type TSignUpSuccess = TActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: TAdditionalInformation }
>;

export type TSignUpFailed = TActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  Error
>;

export type TSignOutStart =
  TActionWithoutPayload<USER_ACTION_TYPES.SIGN_OUT_START>;

export type TSignOutSuccess =
  TActionWithoutPayload<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type TSignOutFailed = TActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

// user action creater
// action generator that returns/create action to be dispathced by components
export const checkUserSession = withMatcher(
  (): TCheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const setCurrentUser = withMatcher(
  (user: TUserData): TSetCurrentUser =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const googleSignInStart = withMatcher(
  (): TGoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): TEmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
  (user: TUserData & { id: string }): TSignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
  (error: Error): TSignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): TSignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: TAdditionalInformation): TSignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailed = withMatcher(
  (error: Error): TSignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
  (): TSignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): TSignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
  (error: Error): TSignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
