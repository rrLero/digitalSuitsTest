import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

const container = document.getElementById('root');

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}/>
                    <Route path=":tab" element={<App />}/>
                </Routes>
            </BrowserRouter>
        </Provider>,
    );
}
