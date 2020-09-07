export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const RESET = "RESET"

const AllProductsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return payload;
        case RESET:
            return [];
        default:
            return state;
    }
};

export default AllProductsReducer;
