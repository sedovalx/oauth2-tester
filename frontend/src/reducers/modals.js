import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const modalsState = {
    editor: {
        server: null
    }
};

export default function(state = modalsState, action) {
    switch (action.type) {
        case actionTypes.SERVER_MODAL_SHOW:
            return u({editor: {server: action.payload || { }}}, state);
        case actionTypes.SERVER_MODAL_CLOSE:
            return u({editor: {server: null}}, state);
        default:
            return state;
    }
}
