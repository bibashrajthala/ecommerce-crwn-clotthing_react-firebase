import { takeLatest, call, put, all } from "redux-saga/effects";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";

// yield is like await of async/await in generator funciton
// call is used to call async functions(like api calls), first parameter is function you want to run, then the other parameters(optional) are argument to that function in first parameter of call()
// put is just the dispatch() in saga
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    console.log(error);
    yield put(fetchCategoriesFailed(error));
  }
}

// takeLatest() takes the latest action dispatched in first parameter and run the method in second parameter on that action type
// used FETCH_CATEGORIES_START here as in saga, action dispatched only reach saga after they reach reducers, so we will dispatch fetchCategoriesStart() in component so the latest action willbe FETCH_CATEGORIES_START, on which we want ot run fetchCategoriesAsync
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// saga to call all the functions necessary for particular action
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
