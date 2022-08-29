import { CATEGORIES_ACTION_TYPES, TCategory } from "./categories.types";
import {
  createAction,
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

// discriminating union of action types that our category reducer will respond to, ie these are only actions reducer will respond to // But the problem is we need our reducer to respond (ie return a state) for each action it recieives such as init action(that gets fired when mounting), redux persist and rehydrate action, etc not just these 3 actions
// so we need to create a withMatcher funtion that recieves our action creaters and returns a object with 'type' property of action reuturned by action creater  and match() method
// then  we will use this match method in reducer to check if the 'type' property of action it recieves matches to type of action returned by action creater
export type TCategoryAction =
  | TFetchCategoriesStart
  | TFetchCategoriesSuccess
  | TFetchCategoriesFailed;

export const fetchCategoriesStart = (): TFetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
  categoriesArray: TCategory[]
): TFetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error: Error): TFetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
