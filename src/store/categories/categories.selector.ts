import { createSelector } from "reselect";

import { TCategoriesState } from "./categories.reducer";
import { TCategoryMap } from "./categories.types";

const selectCategoriesReducer = (state): TCategoriesState => state.categories;

// typescript will auto inherit types as much as possible
const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): TCategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as TCategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
