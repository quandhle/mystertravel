import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn, passTripId} from '../../../actions';
import SignUpForm from './signup_form';
import './sign_up.scss';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    
    async handleSignUp(values) {
        const {nickname, email, password} = values;
        const resp = await axios.post('/api/signup.php', {
            nickname,
            email,
            password
        });

        if(resp.data.success) {
            this.props.signIn(resp.data);
            this.props.history.push('/')
        } else {
            this.setState({
                message: resp.data.error
            });
        }
    }

    handleSignIn = () => {
        this.props.history.push('/account/signin');
    }

    render() {
        return (
            <div className="sign-up-page">
                <div className="sign-up">
                    <SignUpForm signUp={this.handleSignUp} message={this.state.message} signIn={this.handleSignIn}/>
                </div>
            </div>
        );
    }
}

export default connect(null, {signIn, passTripId})(SignIn);
