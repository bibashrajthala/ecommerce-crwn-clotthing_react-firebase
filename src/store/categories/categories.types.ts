// enums are data structures in ts just like objects in js , except enum keys have fixed values, abut can be accessec just like objects values with dot operator.
export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

export type TCategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type TCategory = {
  title: string;
  imageUrl: string;
  items: TCategoryItem[];
};

// key is a variable of type string as key (= title) of accumulator in reduce() of selector can be anything here:hats,men ,women,etc
export type TCategoryMap = {
  [key: string]: TCategoryItem[];
};
