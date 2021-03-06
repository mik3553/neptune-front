import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DecodedContext from '../src/components/Context/Decoded';

import './App.css'
import LandingPage from './components/landingPage/LandingPage';
import LoginPage from './components/register_login/LoginPage';
import HouseDetails from './components/house_details/HouseDetails';
import MyProfile from './components/personnal_space/MyProfile';
import Contact from './components/contact/Contact';
import Finalize from './components/booking/Finalize';
import Admin from './components/admin/Admin';
import My404 from './components/My404';
import * as serviceWorker from './serviceWorker';

const Routes = () => {
        return (
            <DecodedContext>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route path='/register' component={LoginPage} />
                        <Route path='/mon_compte' component={MyProfile} />
                        <Route path='/house_details/:id' component={HouseDetails} />
                        <Route path='/contact' component={Contact} />
                        <Route path='/reservation' component={Finalize} />
                        <Route path='/admin' component={Admin} />
                        <Route path='' component={My404} />
                    </Switch>
                </BrowserRouter>
            </DecodedContext>
        )
}

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
