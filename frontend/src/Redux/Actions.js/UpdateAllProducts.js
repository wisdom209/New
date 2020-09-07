const { GET_ALL_PRODUCTS } = require("../Reducers/AllProductsReducer");

const UpdateAllProducts = (payload)=>({
    type : GET_ALL_PRODUCTS,
    payload : payload
})

export default UpdateAllProducts;