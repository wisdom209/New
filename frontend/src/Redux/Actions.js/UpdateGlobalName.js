const { SET_GLOBAL_NAME } = require("../Reducers/GlobalNameReducer")

const UpdateGlobalName = (payload)=>({
    type : SET_GLOBAL_NAME,
    payload : payload
})

export default UpdateGlobalName;