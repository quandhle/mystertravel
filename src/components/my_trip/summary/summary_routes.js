import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Summary from './summary';
import Budget from './../budget';
import NotFound from './../../404';

export default props => {
    const {match} = props;

    return (
        <Switch>
            <Route exact path={`${match.path}/`} component={Summary}/>
            <Route path={`${match.path}/:trips_id`} component={Summary}/>
        </Switch>
    )
}