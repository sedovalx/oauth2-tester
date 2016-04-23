import u from 'updeep'
import keyMirror from 'keymirror'
import actionTypes from 'actions/actionTypes'

export const flowTypes = keyMirror({
    CODE_FLOW: null,
    RESOURCE_FLOW: null,
    CLIENT_FLOW: null,
    IMPLICIT_FLOW: null
});

const defaultState = {
    items: [
        { code: flowTypes.CODE_FLOW, desc: "Authorization Code" },
        { code: flowTypes.IMPLICIT_FLOW, desc: "Implicit" },
        { code: flowTypes.RESOURCE_FLOW, desc: "Resource Owner Password Credentials" },
        { code: flowTypes.CLIENT_FLOW, desc: "Client Credentials" }
    ]
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
