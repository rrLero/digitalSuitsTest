import React from 'react';
import ReactDOM from 'react-dom';
// import { Router } from 'react-router';
import { Provider } from 'react-redux';
// import { createHashHistory } from 'history';
import App from './App';
import { store } from './store/store';

// const history = createHashHistory();
const container = document.getElementById('root');

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
}
