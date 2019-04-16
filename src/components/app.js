import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './home';
import Nav from './nav';
import Map from './map';
import MyTrip from './my_trip';
import Budget from './my_trip/budget';
import Diary from './my_trip/diary';
import Summary from './my_trip/end_trip';
import AboutUs from './about_us';
import NotFound from './404';

import '../assets/css/app.scss';


const App = () => (
    <div>
        <div className="app center">
            <Nav/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/map' component={Map}/>
                <Route exact path='/mytrip' component={MyTrip}/>
                <Route path='/mytrip/budget' component={Budget}/>
                <Route path='/mytrip/diary' component={Diary}/>
                <Route path='/mytrip/summary' component={Summary}/>
                <Route path='/aboutus' component={AboutUs}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </div>
);

export default App;
