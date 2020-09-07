const { UPDATE_QUANTITY_IN_CART } = require("../Reducers/QuantityReducer");

const UpdateQuantity = (payload) => ({
    type    : UPDATE_QUANTITY_IN_CART,
    payload : payload
});

export const UpdateDelete=(payload)=>({
    type : UPDATE_QUANTITY_IN_CART,
    payload : payload
})
export default UpdateQuantity;
