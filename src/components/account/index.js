import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignIn from './sign_in';
import SignOut from './sign_out';
import SignUp from './sign_up';
import NotFound from '../404';

const Account = props => {
    const {match} = props;

    return (
        <Switch>
            <Route path={`${match.path}/signin`} component={SignIn} />
            <Route path={`${match.path}/signout`} component={SignOut} />
            <Route path={`${match.path}/signup`} component={SignUp} />
            <Route component={NotFound}/>
        </Switch>
    );
}

export default Account;
