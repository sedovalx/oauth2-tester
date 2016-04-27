import React                                        from 'react'
import thunkMiddleware                              from 'redux-thunk'
import { createStore, applyMiddleware, compose }    from 'redux'
import createLogger                                 from 'redux-logger'

import reducer                                      from '/reducers/index'
import DevTools                                     from '/config/devtools'
import callAPIMiddleware                            from '/config/callAPIMiddleware'

const loggerMiddleware = createLogger();

let middlewares = [applyMiddleware(
    callAPIMiddleware({ log: { enabled: true, content: true, error: true } }),
    thunkMiddleware,
    // loggerMiddleware
)];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(DevTools.instrument());
}

var initialize = (initialState) => {
    const store = createStore(reducer, initialState, compose(...middlewares));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
};

export default initialize;