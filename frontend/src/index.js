import ReactDOM     from 'react-dom';
import React        from 'react';
import { Provider } from 'react-redux';
import { polyfill } from 'es6-promise'; polyfill();
import DevTools     from '/config/devtools';
import initStore    from '/config/store';
import AppContainer from '/container/AppContainer';


const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppContainer />
            {devTools}
        </div>
    </Provider>,
    document.getElementById('root')
);

// if (module.hot) {
//     module.hot.accept();
// }
