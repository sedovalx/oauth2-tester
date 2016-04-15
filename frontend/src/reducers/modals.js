import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const modalsState = {
    editor: {
        server: false
    }
};

export default function(state = modalsState, action) {
    switch (action.type) {
        case actionTypes.ADD_SERVER_MODAL_SHOW:
            return u({editor: {server: true}}, state);
        case actionTypes.ADD_SERVER_MODAL_CANCEL:
        case actionTypes.ADD_SERVER_MODAL_ACCEPT:
            return u({editor: {server: false}}, state);
        default:
            return state;
    }
}
