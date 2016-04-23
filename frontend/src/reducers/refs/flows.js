import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    items: []
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SETTINGS_END:
            const flows = action.payload.flows;
            return u({items: flows}, state);
        default:
            return state;
    }
}
