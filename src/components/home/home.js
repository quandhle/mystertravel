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
                <section className="first parallax">
                    <h4 className='title-blurb1'>Travel smarter</h4>
                    <h4 className='title-blurb2'>Plan faster</h4>
                    <UserStart history={this.props.history} signIn={user.auth}/>
                    {signInCheck}
                </section>
                <section className="preTrip section">Plan before you go</section>
                <section className="bg bg2 section parallax"></section>
                <section className="currentTrip section">Keep track of your travels</section>
                <section className="bg bg3 section parallax"></section>
                <section className="postTrip section">Share your travels</section>
                <section className="contact section parallax">
                    Contact Us
                </section>
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