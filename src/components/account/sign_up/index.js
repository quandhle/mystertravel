import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn, passTripId} from '../../../actions';
import SignUpForm from './signup_form';
import './sign_up.scss';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    
    async handleSignUp(values) {
        const {nickname, email, password} = values
        const resp = await axios.post('/api/signup.php', {
            nickname,
            email,
            password
        })

        if(resp.data.success) {
            this.props.signIn(resp.data);
            this.props.history.push('/')
        } else {
            this.setState({
                message: resp.data.error
            })
        }
    }
    render() {

        return(
            <div className="sign-up-page">
                <SignUpForm signUp={this.handleSignUp} message={this.state.message}/>
            </div>
        )
    }
}

export default connect(null, {signIn, passTripId})(SignIn);
