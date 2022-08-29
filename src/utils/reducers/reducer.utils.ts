import { AnyAction } from "redux"; //AnyAction is type of action which can be of any type

// AC here stands of action creater function. AC extends ()=>AnyAction  means now AC is a function that returns action which can be of any type

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"]; //ReturnType<AC> gives a type of what AC function returns,and ReturnType<AC>["type"] gives type of 'type' property  of action returned by AC
  match(action: AnyAction): action is ReturnType<AC>; // it returns a boolean type (true or false) based on (action it receives is of of same type of action retruned by AC or not)
};

// function overloading
// may recieve AC which may have parameter or not
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreater: AC
): Matchable<AC>;
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreater: AC): Matchable<AC>;

// with matcher is a function that recieves our action creaters and returns a object with 'type' property of action returned by action creater  and match() method
// then  we will use this match method in reducer to check if the 'type' property of action it recieves matches to type of action returned by action creater
export function withMatcher(actionCreater: Function) {
  const type = actionCreater().type; //get 'type' property of action returned by actionCreater()
  return Object.assign(actionCreater, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

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
