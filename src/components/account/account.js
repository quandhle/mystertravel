import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignIn from './sign_in';
import SignOut from './sign_out';
import NotFound from '../404';

export default props => {
    const {match} = props;
    return (
        <Switch>
            <Route path={`${match.path}/signin`} component={SignIn} />
            <Route path={`${match.path}/signout`} component={SignOut} />
            <Route component={NotFound}/>
        </Switch>
    )
}