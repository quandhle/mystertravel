import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {signIn, passTripId} from '../../../actions';
import SignInForm from './signin_form';
import './sign_in.scss';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }

        this.handleSignIn = this.handleSignIn.bind(this);
    }

    async handleSignIn(values) {
        const {email, password} = values;
        const resp = await axios.post('/api/login.php', {
            email,
            password
        })

        const {signIn, history} = this.props;
        const {success, trips_id} = resp.data
        if(success) {
            signIn(resp.data);
            if(trips_id){
                this.props.passTripId(trips_id);
                history.push('/mytrip');
            } else {
                history.push('/');
            }
        } else {
            this.setState({
                message: resp.data.error
            })
        }

    }

    handleSignUp = () => {
        this.props.history.push('/account/signup')
    }

    render() {
        return(
            <div className="sign-in-page">
                <div className="sign-in">
                <SignInForm signIn={this.handleSignIn} signUp={this.handleSignUp} message={this.state.message}/>
                </div>
            </div>
        )
    }
}

export default connect(null, {signIn, passTripId})(SignIn);
