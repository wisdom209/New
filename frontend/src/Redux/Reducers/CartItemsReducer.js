import { RESET } from "./AllProductsReducer";

export const UPDATE_T0_CART = "UPDATE_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";

const CartItemsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case UPDATE_T0_CART:
            // return [ ...state, payload ].filter((val, index)=>[...state,payload].indexOf(val) === index);
            return [ ...[ ...state ].filter((val) => val._id !== payload._id), payload ];
        case DELETE_FROM_CART:
            return state.filter((val) => val._id !== payload._id);
        case RESET:
            return [];
        default:
            return state;
    }
};

export default CartItemsReducer;
