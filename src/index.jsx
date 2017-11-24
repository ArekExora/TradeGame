import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import App from './components/app';

const store = createStore(combineReducers(reducers));

require('file-loader?name=index.html!./index.html');

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById('container'),
    );
};

render();

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/app', () => { render(); });
}





