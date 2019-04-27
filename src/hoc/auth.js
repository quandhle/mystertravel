import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function auth(WarpComponent, requireAuth=true, to = '/' ){
    class Auth extends Component{
        componentDidMount(){
            this.checkAuth()
        }
        componentDidUpdate(){
            this.checkAuth()
        }
        checkAuth(){
            const{trips_id, auth} = this.props;
            if(auth !== requireAuth){
                if(trips_id){
                    this.props.history.push('/map')
                } else {
                    this.props.history.push(to)
                }
            } 
        }
        render(){
            return <WarpComponent {...this.props} />
        }
    }

    function mapStateToProps(state){
        console.log('map:',state.user)
        return {
            auth: state.user.auth,
            trips_id: state.user.trips_id
        }
    }

    return connect(mapStateToProps)(Auth);
}