import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/categories.saga";
import { userSagas } from "./user/user.saga";

// Generator function(alike async await) but use yield instead of await=> make control on operation's pause and continue
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
