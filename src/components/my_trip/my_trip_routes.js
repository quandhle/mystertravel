import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MyTrip from './';
import Budget from './budget';
import Diary from './diary';
import Summary from './end_trip';
import NotFound from './../404';

export default props => {
    const {match} = props;

    return (
        <div className='test'>
            <Switch>
                <Route exact path={`${match.path}/`} component={MyTrip}/>
                <Route path={`${match.path}/budget`} component={Budget}/>
                <Route path={`${match.path}/diary`} component={Diary}/>
                <Route path={`${match.path}/summary`} component={Summary}/>
                <Route component={NotFound}/>
            </Switch>
        </div>

    )
}