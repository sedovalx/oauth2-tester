import keyMirror from 'keymirror'

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
        { code: flowTypes.RESOURCE_FLOW, desc: "Password Credentials" },
        { code: flowTypes.CLIENT_FLOW, desc: "Client Credentials" }
    ]
};

export default function(state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
