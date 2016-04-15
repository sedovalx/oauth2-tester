import { combineReducers } from 'redux'
import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const commonState = {
    title: "OAuth 2.0 Tester",
    flows: [
        { name: "CODE_FLOW", desc: "Code flow" },
        { name: "RESOURCE_FLOW", desc: "Resource Owner Flow" },
        { name: "CLIENT_FLOW", desc: "Client Flow" }
    ]
};
function commons(state = commonState) {
    return state;
}

let phasesState = {
    selectServer: {
        name: "SELECT_SERVER",
        desc: "1. Add or select existing OAuth 2.0 server",
        selected: null,
        flow: "CODE_FLOW"
    },
    queryToken: {
        name: "QUERY_TOKEN",
        desc: "2. Get authorization code and exchange it for tokens",
        authCode: "",
        authToken: "",
        refreshToken: ""
    },
    queryData: {
        name: "QUERY_DATA",
        desc: "3. Make a request to the API"
    }
};
function phases(state = phasesState){
    return state;
}

function availablePhases(state = ["SELECT_SERVER"]) {
    return state;
}

function errors(state = { last: null }, action) {
    switch (action.type) {
        case actionTypes.REQUEST_SERVERS_END:
            if (action.error){
                return u({last: action.payload}, state);
            } else {
                return state;
            }
        default:
            return state;
    }
}

function servers(state = { isFetching: false, items: [] }, action) {
    switch (action.type) {
        case actionTypes.REQUEST_SERVERS_START:
            return u({ isFetching: true }, state);
        case actionTypes.REQUEST_SERVERS_END:
            let newState = u({ isFetching: false }, state);
            return action.error ? newState : u({items: action.payload}, newState);
        default:
            return state;
    }
}

export default combineReducers({
    commons,
    phases,
    availablePhases,
    errors,
    servers
});