import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import LandingPage from './components/Body/LandingPage'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<LandingPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
