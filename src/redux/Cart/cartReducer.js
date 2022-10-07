import { DECREMENT, INCREMENT } from "./actionType";

const initialState = {
  numberCart: 0,
  Carts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      console.log(action.payload);
      const cart = {
        name: action.payload.name,
        _id: action.payload._id,
        image: action.payload.image,
        price: action.payload.price,
        quantity: 1,
      };
      state.Carts.push(cart);

      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    // case DECREMENT:
    //   return {
    //     ...state,
    //     value: state.value - action.payload,
    //   };

    default:
      return state;
  }
};

export default cartReducer;
