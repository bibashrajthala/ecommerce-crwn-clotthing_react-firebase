// helper/utinily functions used in aciton creater functions below.
import {
  createAction,
  TActionWithPayload,
  withMatcher,
} from "../../utils/reducers/reducer.utils";
import { CART_ACTION_TYPES, TCartItem } from "./cart.types";
import { TCategoryItem } from "../categories/categories.types";

// helper functions
const addCartItem = (
  cartItems: TCartItem[],
  productToAdd: TCategoryItem
): TCartItem[] => {
  // find if cartItems array contains productToAdd object
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cartItems / new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: TCartItem[],
  cartItemToRemove: TCartItem
): TCartItem[] => {
  //find the cartItem to be removed
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if the quantity of that cart item to be removed is equal to 1,if it is ,then remove it from new cartItems array using filter method
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  //return back cartItem with matching cart item to be removed with decreased quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: TCartItem[],
  cartItemToClear: TCartItem
): TCartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// return types of action creaters which return action ie type of action returned by action creaters
export type TSetCartItems = TActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  TCartItem[]
>;
export type TSetIsCartOpen = TActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

// action creaters
export const setIsCartOpen = withMatcher((bool: boolean): TSetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
});

export const setCartItems = withMatcher(
  (cartItems: TCartItem[]): TSetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
  }
);

export const addItemToCart = (
  cartItems: TCartItem[],
  productToAdd: TCategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: TCartItem[],
  cartItemToRemove: TCartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: TCartItem[],
  cartItemToClear: TCartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};
