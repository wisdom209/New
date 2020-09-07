import { RESET } from "./AllProductsReducer";

export const UPDATE_SELECTION = "UPDATE_SELECTION"
export const DELETE_SELECTION = "DELETE_SELECTION"

const SelectedItemsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case UPDATE_SELECTION:
            return payload;
        case DELETE_SELECTION:
            return {};
            case RESET:
                return {};
        default:
            return state;
    }
};

export default SelectedItemsReducer;
