import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut, clearTripId} from '../../../actions';
import axios from 'axios';
import './sign_out.scss';

class SignOut extends Component{
    async componentDidMount() {
        await axios.post("/api/logout.php"); 

        this.props.signOut();
        this.props.clearTripId();

        setTimeout(this.redirectToHome, 2000);
    }

    redirectToHome = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="signout-page">
                <h2>Ciao!</h2>
            </div>
        );
    }
}

export default connect(null, {
    signOut: signOut,
    clearTripId: clearTripId
})(SignOut);
