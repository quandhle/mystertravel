import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn} from '../../../actions';
import SignInForm from './signin_form';
import './sign_in.scss';

class SignIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            message: ''
        }

        this.handleSignIn = this.handleSignIn.bind(this);
    }
    async handleSignIn (values){
        const {email, password} = values
        const resp = await axios.post('/api/login.php', {
            email,
            password
        })

        const {signIn, history} = this.props;

        if(resp.data.success){
            signIn(resp.data);
            if(resp.data.trips_id){
                history.push('/map');
            } else {
                history.push('/');
            }
        } else {
            this.setState({
                message: resp.data.error
            })
        }

    }
    render(){
        return(
            <div className="sign-in-page">
                <SignInForm signIn={this.handleSignIn}/>
                <div className="message">{this.state.message}</div>
            </div>
        )
    }
}

export default connect(null, {signIn})(SignIn);