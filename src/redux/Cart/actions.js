import { DECREMENT, INCREMENT,QDECREMENT,QINCREMENT } from "./actionType";

export const increment = (value) => {

  return {
    type: INCREMENT,
    payload: value,
  };
};
export const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};
export const quantityDecrement = (value) => {
  return {
    type: QINCREMENT,
    payload: value,
  };
};
export const quantityIncrement = (value) => {
  return {
    type: QDECREMENT,
    payload: value,
  };
};
