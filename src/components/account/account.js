import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignIn from './sign_in';
import NotFound from '../404';

export default props => {
    const {match} = props;
    return (
        <Switch>
            <Route path={`${match.path}/signin`} component={SignIn} />
            <Route component={NotFound}/>
        </Switch>
    )
}