import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn, passTripId} from '../../../actions';
import SignUpForm from './signup_form';
import './sign_up.scss';

class SignIn extends Component{
    constructor(props){
        super(props);

        this.handleSignUp = this.handleSignUp.bind(this);
    }
    async handleSignUp (values){
        const {email, password} = values
        const resp = await axios.post('', {
            nickname,
            email,
            password
        })
    }
    render(){
        return(
            <div className="sign-up-page">
                <SignUpForm signUp={this.handleSignUp}/>
            </div>
        )
    }
}

export default connect(null, {signIn, passTripId})(SignIn);