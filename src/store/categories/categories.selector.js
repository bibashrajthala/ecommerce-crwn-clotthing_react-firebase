//the reduce() produce a new array(in memory) which is used by setProducts() inside useEffect() each time a selector is fired inside category component, this causes category component to rerender extra time , each time selector is fired
// so lets create a memoized selector so that returns a momoized category object for same categories slice(reducer) and same categories array we got from firebase
// for that we use reselct library's createSelector()
// createSElector()  creates memoizing funcion, it takes two parameter=> 1st parameter= array , 2nd paramenter => is function whose arguments are the elements of 1st parameter array, this 2nd paameter/function returns a same memoized value for same/unchanged elements of 1st parameter/array, and gives new value/object (not memoized) if elemet in aray of 1st paramter change

import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// now this selectCategories's and selectCategoriesMap's createSelector's 2nd parameter function will be fired for  first time giving a value, then they will only be fired if categoriesSlice and categories changes respectively, otherwise it will not fire that 2nd parameter and return the same memoized value got when it first fired.

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
