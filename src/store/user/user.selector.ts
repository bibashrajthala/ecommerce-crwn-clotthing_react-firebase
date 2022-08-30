import { createSelector } from "reselect";
import { TUserState } from "./user.reducer";
import { TRootState } from "../store";

export const selectUserReducer = (state: TRootState): TUserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
