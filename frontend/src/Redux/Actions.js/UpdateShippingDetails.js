const { UPDATE_SHIPPING_DETAILS } = require("../Reducers/ShippingDetailsReducer");

const UpdateShippingDetails = (payload)=>({
    type : UPDATE_SHIPPING_DETAILS,
    payload : payload
})

export default UpdateShippingDetails