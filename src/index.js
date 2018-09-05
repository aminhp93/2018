import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import GoldenLayoutWrapper from './components/GoldenLayoutWrapper.js';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <GoldenLayoutWrapper />
    </Provider>
    , document.getElementById('root')
);
