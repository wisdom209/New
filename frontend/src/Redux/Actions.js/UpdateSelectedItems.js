const { UPDATE_SELECTION, DELETE_SELECTION } = require("../Reducers/SelectedItemsReducer");

const UpdateSelectedItems = (payload) => ({
    type    : UPDATE_SELECTION,
    payload : payload
});

export const DeleteSelectedItem=(payload)=>(
    {
        type : DELETE_SELECTION,
        payload: payload
    }
)

export default UpdateSelectedItems