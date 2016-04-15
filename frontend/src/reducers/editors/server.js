import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const serverState = {
    id: null,
    name: null,
    authEndpoint: null,
    tokenEndpoint: null,
    clientID: null,
    clientSecret: null    
};

export default function(state = serverState, action) {
    switch (action.type) {
        case actionTypes.ADD_SERVER_MODAL_SHOW:
        case actionTypes.ADD_SERVER_MODAL_CANCEL:
            return u(serverState, state);
    }
    return state;
}
