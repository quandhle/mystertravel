import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn} from '../../../actions';
import SignInForm from './signin_form';
import './sign_in.scss';

class SignIn extends Component{
    constructor(props){
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
    }
    async handleSignIn (values){
        const {email, password} = values
        const resp = await axios.post('/api/login.php', {
            email,
            password
        })

        if(resp.data.success){
           this.props.signIn(resp.data); 
        } else {
            console.error("Unable to sign in")
        }

    }
    render(){
        return(
            <div className="sign-in-page">
                <SignInForm signIn={this.handleSignIn}/>
            </div>
        )
    }
}

export default connect(null, {signIn})(SignIn);