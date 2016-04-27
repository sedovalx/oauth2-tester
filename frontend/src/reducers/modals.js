import u            from 'updeep'
import actionTypes  from '/actions/actionTypes'

const modalsState = {
    editor: {
        server: false,
        settings: false
    }
};

export default function(state = modalsState, action) {
    switch (action.type) {
        case actionTypes.SERVER_MODAL_SHOW:
            return u({editor: {server: true}}, state);
        case actionTypes.SERVER_MODAL_CLOSE:
            return u({editor: {server: false}}, state);
        case actionTypes.SETTINGS_MODAL_SHOW:
            return u({editor: {settings: true}}, state);
        case actionTypes.SETTINGS_MODAL_CLOSE:
            return u({editor: {settings: false}}, state);
        default:
            return state;
    }
}
