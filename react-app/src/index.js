import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Header from './js/shared/header';
import App from './js/video/index';
import reportWebVitals from './js/reportWebVitals';

const header = <Header name="header" />;
const app = <App name="App" />;

ReactDOM.render(header, document.getElementById('header'));
ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
