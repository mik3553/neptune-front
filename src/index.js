import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import LandingPage from './components/landingPage/LandingPage'
import LoginPage from './components/register_login/LoginPage'
import HouseDetails from './components/house_details/HouseDetails'
import * as serviceWorker from './serviceWorker';

const Routes = () => {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/register' component={LoginPage} />
                    <Route path='/house_details' component={HouseDetails} />
                </Switch>
            </BrowserRouter>
        )
}

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
