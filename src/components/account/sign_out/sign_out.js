import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../../actions';
import axios from 'axios';

class SignOut extends Component{
    async componentDidMount(){
        try{
           const resp = await axios.post("/api/logout.php"); 
           this.props.signOut();
           this.props.history.push('/');
        } catch{

        }
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