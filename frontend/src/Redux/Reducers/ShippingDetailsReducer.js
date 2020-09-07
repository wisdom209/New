import { RESET } from "./AllProductsReducer";

export const UPDATE_SHIPPING_DETAILS = "UPDATE_SHIPPING_DETAILS"

const ShippingDetailsReducer=(state={}, {type, payload})=>{
    switch (type) {
        case UPDATE_SHIPPING_DETAILS:
         return payload  
         case RESET:
             return {}; 
        default:
            return state;
    }
}

export default ShippingDetailsReducer