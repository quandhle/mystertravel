import React, {Component} from 'react';
import Guest from './guest';
import './home.scss';

class Home extends Component {
    toSignInPage= ()=>{
        this.props.history.push("/signin")
    }
    checkSignIn(){
        // after sign in page finish
    }
    render() {
        return (
            <div className="home-page">
                <h4 className='title-blurb1'>Travel smarter</h4>
                <h4 className='title-blurb2'>Plan faster</h4>
                <Guest history={this.props.history}/>
                <div className="home-page-btn">
                    <button onClick={this.toSignInPage} className="home-start-btn btn">Sign In</button>
                </div>
            </div>
        )
    }
}

export default Home;