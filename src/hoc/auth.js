import React, {Component} from 'react';
import {connect} from 'react-redux';

const Auth = (WrappedComponent, requireAuth = true, to = '/' ) => {
    class Auth extends Component{
        componentDidMount() {
            this.checkAuth();
        }

        componentDidUpdate() {
            this.checkAuth();
        }

        checkAuth() {
            const {auth, history} = this.props;

            if(auth !== requireAuth && !localStorage.getItem('signedIn')) {
                history.push(to);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.user.auth
        };
    }

    return connect(mapStateToProps)(Auth);
}

export default Auth;