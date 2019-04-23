import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MyTrip from './';
import Budget from './budget';
import Notes from './notes';
import SummaryRoutes from './summary/summary_routes';
import NotFound from './../404';

export default props => {
    const {match} = props;

    return (
        <div className='my-trip-page'>
            <Switch>
                <Route exact path={`${match.path}/`} component={MyTrip}/>
                <Route path={`${match.path}/budget`} component={Budget}/>
                <Route path={`${match.path}/notes`} component={Notes}/>
                <Route path={`${match.path}/summary`} component={SummaryRoutes}/>
                <Route component={NotFound}/>
            </Switch>
        </div>

    )
}