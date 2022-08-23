import { takeLatest, all, call, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed } from "./user.action"; // as we already know we only need case of success and failed in saga as we dispatch start from component on which we run saga which dispatch(put ) success or fail
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails // for display name
    );
    console.log(userSnapshot);
    console.log(userSnapshot.data());
    yield put(
      signInSuccess({
        ...userSnapshot.data(),
        id: userSnapshot.id, // as we only have email,displayName in payload from snapshot, and  we need id as well
      })
    );
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  // double destructured the action's payload dispatched from sign in component
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser); // get the authenticated user or null
    if (!userAuth) return; // if no authenticated user , then terminate
    yield call(getSnapshotFromUserAuth, userAuth); // if we get current authenticated user, then send it  to getSnapshotFromUserAuth to create its snapshot
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onEmailSignIn),
  ]);
}
