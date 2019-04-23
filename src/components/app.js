import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './home';
import Nav from './nav';
import Map from './map';
import MyTripRoutes from './my_trip/my_trip_routes';
import AboutUs from './about_us';
import NotFound from './404';
import Account from './account';
import Summary from './my_trip/summary';

import '../assets/css/app.scss';

const App = () => (
    <div>
        <div className="app center">
            <Nav/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/map' component={Map}/>
                <Route path='/mytrip' component={MyTripRoutes}/>
                <Route path='/aboutus' component={AboutUs}/>
                <Route path='/account' component={Account}/>
                <Route path='/trip/:trips_id' component={Summary}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </div>
);

export default App;
