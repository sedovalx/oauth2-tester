import ReactDOM from 'react-dom';
import React from 'react';
import DevTools from 'config/devtools';
import { Provider } from 'react-redux';
import initStore from 'config/store';

import App from 'container/App';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore({
    phases: [
        { name: 'SelectServer', content: {}, desc: 'Выберите OAuth 2.0 сервер. Можно добавить свой.' },
        { name: 'QueryToken', content: {}, desc: 'Запустите процесс получения токена для доступа к ресурсам.' },
        { name: 'QueryData', content: {}, desc: 'Выполните запрос к API сервера ресурсов, используя полученный токен.' }
    ],
    activePhase: 0
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
