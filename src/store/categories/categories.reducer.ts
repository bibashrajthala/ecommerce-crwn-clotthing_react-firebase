import { TCategory } from "./categories.types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { AnyAction } from "redux";

// state of reducers are readonly , meaning they cant be changed/written, as reducers always return new state in memory , they never mutate same state
export type TCategoriesState = {
  readonly categories: TCategory[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: TCategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// state inherits type of initial state
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action : AnyAction
): TCategoriesState => {
  if (fetchCategoriesStart.match(action)) return { ...state, isLoading: true };

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, isLoading: false, categories: action.payload };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }

  return state;
};
