import { CATEGORIES_ACTION_TYPES, TCategory } from "./categories.types";
import { TCategoryAction } from "./categories.action";

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
  action = {} as TCategoryAction
) => {
  // const { type, payload } = action;
  // we cant do this now as action of type  TFetchCateogoriesSuccess of union TCateogoryAction dont have payload

  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: action.payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
