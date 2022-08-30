import { TCategoryItem } from "../categories/categories.types"

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_IS_CART_OPEN = "SET_IS_CART_OPEN",
}

// we know by looking at out  cart reducer state and action creaters that cartItems is an array of cartItem which is same as Cateogory item but have an  additional property of quantityso we used &(and/intersection)
export type TCartItem = TCategoryItem & {
quantity:number
}

