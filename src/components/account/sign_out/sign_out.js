import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../../actions';
import axios from 'axios';
import './sign_out.scss';

class SignOut extends Component{
    async componentDidMount(){
        try{
           const resp = await axios.post("/api/logout.php"); 
           this.props.signOut();
           setTimeout(this.redirectToHome, 3000);
        } catch{

        }
    }
    redirectToHome= ()=>{
        this.props.history.push('/')
    }
    render(){
        return(
            <div className="signout-page">
                <h2>See you next time!</h2>
            </div>
        )

    }
}

export default connect(null,{
    signOut: signOut
})(SignOut);