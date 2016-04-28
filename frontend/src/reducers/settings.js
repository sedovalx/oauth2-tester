import u            from 'updeep'
import actionTypes  from '/actions/actionTypes'

const defaultState = {
    callbackUri: location.origin + '/',
    title: 'OAuth 2.0 Tester',
    username: null,
    password: null
};

export default function(state = defaultState, action) {
    if (action.error) return state;

    switch (action.type) {
        case actionTypes.SETTINGS_MODAL_CLOSE:
            if (action.payload){
                const { username, password } = action.payload;
                return u({ username, password }, state);
            } else {
                return state;
            }
        default:
            return state;
    }
}
