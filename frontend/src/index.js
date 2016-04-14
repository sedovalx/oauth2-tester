import ReactDOM from 'react-dom';
import React from 'react';
import DevTools from 'config/devtools';
import { Provider } from 'react-redux';
import initStore from 'config/store';
import initialState from 'config/initialState';
import App from 'component/App';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
            {devTools}
        </div>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
