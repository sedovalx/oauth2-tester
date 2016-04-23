const defaultState = {
    callbackUri: location.origin + '/',
    title: 'OAuth 2.0 Tester'
};

export default function(state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
