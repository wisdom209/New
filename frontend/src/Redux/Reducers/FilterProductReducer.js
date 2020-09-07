const { RESET } = require("./AllProductsReducer");
export const FILTER_JEWELRY = "FILTER_JEWELRY";
export const FILTER_MEN_CLOTHING = "FILTER_MEN_CLOTHING";
export const FILTER_WOMEN_CLOTHING = "FILTER_WOMEN_CLOTHING";
export const FILTER_ELECRONICS = "FILTER_ELECTRONICS";
export const FILTER_ALL= "FILTER_ALL"

const FilterProductReducer = (state = [], { type, payload }) => {
    switch (type) {
        case FILTER_JEWELRY:
            return payload.filter((val) => val.category === "jewelery");
        case FILTER_MEN_CLOTHING:
            return payload.filter((val) => val.category === "men clothing");
        case FILTER_WOMEN_CLOTHING:
            return payload.filter((val) => val.category === "women clothing");
        case FILTER_ELECRONICS:
            return payload.filter((val) => val.category === "electronics");
        case FILTER_ALL:
            return payload
        case RESET:
            return [];
        default:
            return state;
    }
};

export default FilterProductReducer;
