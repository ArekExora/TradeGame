import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Test from './components/Test';

require('file-loader?name=index.html!./index.html');

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component prop1={'HOLA'} prop2={'MUNDO'} />
        </AppContainer>,
        document.getElementById('container'),
    );
};

render(Test);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/Test', () => { render(Test); });
}
