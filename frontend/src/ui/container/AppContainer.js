import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import u from 'updeep'
import App from 'component/App'
import actionTypes from 'actions/actionTypes'
import stateService from 'services/state'

const mapStateToProps = state => ({
    state
});

const mapDispatchToProps = dispatch => ({
    onInit: (state) => {
        dispatch(createAction(actionTypes.DEFAULT_STATE)(state));
        try {
            const parsedState = parseUri();
            const current = buildCurrentState(state, parsedState);
            return dispatch(createAction(actionTypes.CURRENT_STATE)(current));
        } catch (e) {
            dispatch(createAction(actionTypes.LOCAL_ERROR)(e));
        }
    }
});

function parseUri() {
    let state = stateService.deserialize(getParameterByName('state'));

    const code = getParameterByName('code');
    if (code) {
       state = u({ auth: { code: code } }, state);
    }

    const token = getParameterByName('token');
    if (token) {
        state = u({ auth: { token: token } }, state);
    }

    const errorCode = getParameterByName('error');
    if (errorCode) {
        let errorMessage = `Authorization error [${decodeURIComponent(errorCode)}].`;
        const errorDesc = getParameterByName('error_description');
        if (errorDesc) {
            errorMessage += ` Description: ${decodeURIComponent(errorDesc)}.`
        }
        const errorUri = getParameterByName('error_uri');
        if (errorUri) {
            errorMessage += ` Error URL: ${errorUri}.`
        }
        throw new Error(errorMessage)
    }
    return state;
}

const noop = item => item;

function buildCurrentState(state, parsedState) {
    let current = u({}, state.current);
    if (parsedState != null && typeof parsedState === 'object') {
        if (parsedState.flow) {
            current = u({ flow: state.refs.flows.items.filter(i => i.code === parsedState.flow).pop() || noop }, current);
        }
        if (parsedState.server) {
            // servers ref could be empty
            current = u({ server: state.refs.servers.items.filter(s => s.name === parsedState.server).pop() || parsedState.server }, current);
        }
        if (parsedState.auth) {
            current = u({ auth: parsedState.auth }, current);
        }
    }
    return current;
}

//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


