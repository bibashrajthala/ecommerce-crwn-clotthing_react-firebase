import { CATEGORIES_ACTION_TYPES, TCategory } from "./categories.types";
import {
  createAction,
  withMatcher,
  TActionWithPayload,
  TActionWithoutPayload,
} from "../../utils/reducers/reducer.utils";

// return type of fetchCategoriesStart() ie, it returns action without payload,ie with type only , of CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
export type TFetchCategoriesStart =
  TActionWithoutPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
// similarly
export type TFetchCategoriesSuccess = TActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  TCategory[]
>;
export type TFetchCategoriesFailed = TActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

// discriminating union of action types that our category reducer will respond to, ie these are only actions reducer will respond to // But the problem is:default case of reducer will never run and  we need our reducer to respond (ie return a state) using default case for each action it recieives such as init action(that gets fired when mounting), redux persist and rehydrate action, etc not just these 3 actions
// so we need to create a withMatcher funtion(in out createAction utils file) that recieves our action creaters and returns a object with 'type' property of action reuturned by action creater  and match() method
// then  we will use this match method in reducer to check if the 'type' property of action it recieves matches to type of action returned by action creater

// with that we dont even will need this union(even though this practice is much used with redux)
// export type TCategoryAction =
//   | TFetchCategoriesStart
//   | TFetchCategoriesSuccess
//   | TFetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher(
  (): TFetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

// pass  our action creaters that returns action objects to withMatcher()
export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: TCategory[]): TFetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): TFetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
