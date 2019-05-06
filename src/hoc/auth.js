import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (WrappedComponent, requireAuth = true, to = '/' ) {
    class Auth extends Component{
        componentDidMount(){
            this.checkAuth()
        }
        componentDidUpdate(){
            this.checkAuth()
        }
        checkAuth(){
            const {auth} = this.props;
            if(auth !== requireAuth){
                this.props.history.push(to)
            }
        }
        render(){
            return <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.user.auth
        }
    }

    return connect(mapStateToProps)(Auth);
}
