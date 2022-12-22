import {
  CLEANCARTS,
  DECREMENT,
  INCREMENT,
  QDECREMENT,
  QINCREMENT,
} from "./actionType";

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
    

      return [
        ...state,
       {
        name: action.payload.name,
        _id: action.payload._id,
        image: action.payload.image,
        price: action.payload.price,
        quantity: 1,
      }
      ]
        
      
    case DECREMENT:
    
    return state.filter((item) => item._id != action.payload._id)
      
    
    case QINCREMENT:
      // const findData = state.Carts.findIndex(
      //   (e) => e._id === action.payload._id
      // );

      // state.Carts[findData].quantity = state[findData].quantity + 1;
      return state.map((item, index) => {
   
        if (item._id != action.payload._id) {
          return item;
        }
        return {
         ...item,
         quantity: item.quantity +1,
        }
      });
    case QDECREMENT:
      return state.map((item, index) => {
        if (item._id != action.payload._id) {
          return item;
        }
  
        return {
         ...item,
         quantity: item.quantity -1,
        }
      });
    case CLEANCARTS:
      return state= [];
     

    default:
      return state;
  }
};

export default cartReducer;
