import ReactDOM from 'react-dom';
import React from 'react';
import DevTools from 'config/devtools';
import { Provider } from 'react-redux';
import initStore from 'config/store';

import App from 'container/App';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

let phases = [
    { name: 'Phase 1', content: '111', desc: 'asdasd' },
    { name: 'Phase 2', content: '222', desc: 'asdasd' },
    { name: 'Phase 3', content: '333', desc: 'asdasd' },
    { name: 'Phase 4', content: '444', desc: 'asdasd' }
];
const store = initStore({
    phases: phases,
    activePhase: phases[0]
});

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
