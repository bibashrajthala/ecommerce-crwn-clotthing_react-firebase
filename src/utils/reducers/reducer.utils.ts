import { AnyAction } from "redux";

export type TActionWithPayload<T, P> = {
  type: T;
  payload: P;
  //cant to payload?:P for action without payload  as it means payload : P or undefined type but we want payload : void when action dont have payload
};

export type TActionWithoutPayload<T> = {
  type: T;
};

// function overloading=> same function can return different type according to its parameter types it receive , it can receive different types of parameter , but should have same number parameters
export function createAction<T extends string, P>(
  type: T,
  payload: P
): TActionWithPayload<T, P>; // it can returns action with payload
export function createAction<T extends string>(
  type: T,
  payload: void
): TActionWithoutPayload<T>; // it can also return action without payload

// type of what it can return are overloaded above
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
