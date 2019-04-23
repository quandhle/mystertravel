import React, {Component} from 'react';
import {connect} from 'react-redux';
import Guest from './guest';
import './home.scss';

class Home extends Component {
    toSignInPage= ()=>{
        this.props.history.push("/account/signin")
    }
    checkSignIn(){
        const{user} = this.props;

        if(!user.auth){
            return(
                <div className="home-page-btn">
                    <button onClick={this.toSignInPage} className="home-start-btn btn">Sign In</button>
                </div>
            )
        } else {
            return null;
        }
    }
    render() {
        const{user} = this.props;
        const signInCheck = this.checkSignIn();
        return (
            <div className="home-page">
                <h4 className='title-blurb1'>Travel smarter</h4>
                <h4 className='title-blurb2'>Plan faster</h4>
                <Guest history={this.props.history} signIn={user.auth}/>
                {signInCheck}
            </div>
        )
    }
}

function mapStateToProps(state){
   return{
      user: state.user 
   } 
}

export default connect(mapStateToProps)(Home);