import { createSelector } from "reselect";
import { TUserState } from "./user.reducer";

export const selectUserReducer = (state): TUserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);
