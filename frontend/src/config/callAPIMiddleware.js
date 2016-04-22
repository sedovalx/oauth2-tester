const defaultOptions = {
    log: { 
        enabled: false, 
        content: false, 
        error: false 
    }
};

export default function (options = defaultOptions) {
    const logOptions = options.log;
    
    return function ({ dispatch, getState }) {
        return next => action => {
            const {
                types,
                callAPI,
                contentType = 'json',
                actionBody = {},
                handleResponse = null,
                shouldCallAPI = () => true
            } = action;

            if (!(types && callAPI)) {
                // Normal action: pass it on
                return next(action);
            }

            if (!Array.isArray(types) || types.length !== 2 || !types.every(type => typeof type === 'string')) {
                throw new Error('Expected an array of two string types.');
            }

            if (typeof callAPI !== 'function') {
                throw new Error('Expected fetch to be a function.')
            }

            if (!shouldCallAPI(getState())) {
                return
            }

            const [ requestType, responseType ] = types;

            dispatch(Object.assign({}, actionBody, {
                type: requestType
            }));

            return callAPI().then(response => {
                logOptions && logOptions.enabled && console.log(response);

                if (!response.ok) {
                    const error = new Error(`Server responded with ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
                return response;
            }).then(response => {
                switch (contentType) {
                    case 'json':
                        return response.json();
                    case 'text':
                        return response.text();
                    default:
                        return handleResponse(response);
                }
            }).then(result => {
                logOptions && logOptions.enabled && logOptions.content && console.log(result);
                dispatch(Object.assign({}, actionBody, {
                    type: responseType,
                    payload: result
                }));
                return result;
            }).catch(error => {
                logOptions && logOptions.enabled && logOptions.error && console.error(error);
                dispatch(Object.assign({}, actionBody, {
                    type: responseType,
                    payload: error,
                    error: true
                }));
                throw error;
            }) 
        }
    }
}

