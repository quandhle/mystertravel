import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignIn from './sign_in';
import SignOut from './sign_out';
import SignUp from './sign_up';
import NotFound from '../404';
import auth from '../../hoc/auth';

export default props => {
    const {match} = props;
    return (
        <Switch>
            <Route path={`${match.path}/signin`} component={auth(SignIn, false)} />
            <Route path={`${match.path}/signout`} component={SignOut} />
            <Route path={`${match.path}/signup`} component={auth(SignUp,false)} />
            <Route component={NotFound}/>
        </Switch>
    )
}