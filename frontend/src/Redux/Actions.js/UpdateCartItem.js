const { UPDATE_T0_CART, DELETE_FROM_CART } = require("../Reducers/CartItemsReducer");

export const updateToCart = (payload)=>({
    type : UPDATE_T0_CART,
    payload : payload
})

export const deleteFromCart=(payload)=>({
    type : DELETE_FROM_CART,
    payload : payload
})
