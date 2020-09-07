import { RESET } from "./AllProductsReducer";

export const UPDATE_QUANTITY_IN_CART = "UPDATE_QUANTITY_IN_CART";
export const DELETE_QUANTITY_iN_CART = "DELETE_QUANTITY_IN_CART";

const QuantityReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_QUANTITY_IN_CART:
            return Object.assign({}, state, payload);
        case DELETE_QUANTITY_iN_CART:
            return payload;
        case RESET:
            return {};
        default:
            return state;
    }
};

export default QuantityReducer;
