import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    )
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}