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
        const {nickname, email, password} = values
        const resp = await axios.post('/api/signup.php', {
            nickname,
            email,
            password
        })

        if(resp.data.success){
            this.props.signIn(values);
        } else {
            console.log(resp.data.error)
        }
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