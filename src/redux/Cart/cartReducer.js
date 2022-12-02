import {
  CLEANCARTS,
  DECREMENT,
  INCREMENT,
  QDECREMENT,
  QINCREMENT,
} from "./actionType";

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
    case DECREMENT:
      const findIndex = state.Carts.filter((e) => e._id !== action.payload._id);

      state.Carts = findIndex;
      return {
        ...state,
        numberCart: state.numberCart - 1,
      };
    case QINCREMENT:
      const findData = state.Carts.findIndex(
        (e) => e._id === action.payload._id
      );

      state.Carts[findData].quantity = state.Carts[findData].quantity + 1;
      return state;
    case QDECREMENT:
      const findDataa = state.Carts.findIndex(
        (e) => e._id === action.payload._id
      );
      if (state.Carts[findDataa].quantity > 1) {
        state.Carts[findDataa].quantity -= 1;
        return state;
      } else if (state.Carts[findDataa].quantity === 1) {
        const findIndex = state.Carts.filter(
          (e) => e._id !== action.payload._id
        );

        state.Carts = findIndex;
        return {
          ...state,
          numberCart: state.numberCart - 1,
        };
      }
    case CLEANCARTS:
     
      return {
        numberCart: 0,
        Carts: [],
      } 
     
    default:
    return state;
  }
};

export default cartReducer;
