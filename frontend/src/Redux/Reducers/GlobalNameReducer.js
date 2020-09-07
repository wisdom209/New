import Cookie from "js-cookie";
import { RESET } from "./AllProductsReducer";

export const SET_GLOBAL_NAME = "SET_GLOBAL_NAME";

const GlobalNameReducer = (state = Cookie.get("globalName") || "", { type, payload }) => {
    switch (type) {
        case SET_GLOBAL_NAME:
            return payload;
        case RESET:
            return Cookie.get("globalName");
        default:
            return state;
    }
};

export default GlobalNameReducer;
