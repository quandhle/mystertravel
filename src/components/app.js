import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Nav from './nav';
import Map from './map';

import '../assets/css/app.scss';


const App = () => (
    <div>
        <div className="app center">
            <Nav/>
            <Switch>
                <Route path='/map' component={Map}/>
            </Switch>
        </div>
    </div>
);

export default App;
