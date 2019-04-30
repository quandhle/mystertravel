import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserStart from './user_start';
import './home.scss';

class Home extends Component {
    toSignInPage= ()=>{
        this.props.history.push("/account/signin")
    }
    checkSignIn(){
        const{user} = this.props;

        if(!user.auth){
            return(
                <div className="home-page-btn sign-in-btn">
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
                <div className="home-title"><h4 className='title-blurb1'>Start A Journey</h4></div>
                <div className="home-title"><h4 className='title-blurb3'>&</h4></div>
                <div className="home-title"><h4 className='title-blurb2'>Share Memories</h4></div>
                <UserStart history={this.props.history} signIn={user.auth}/>
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