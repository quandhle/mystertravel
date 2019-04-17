import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class SideNav extends Component{
    render(){
        const {open, toggle} =this.props

        if(open){
            return(
            <div className="side-nav-box" onClick={toggle}>
                <div className="side-nav">
                    <div className="side-nav-title">Side Nav</div>
                    <ul className="side-nav-links">
                        <Link to="/mytrip"><li>Current Trip</li></Link>
                        <Link to="/aboutus"><li>About Us</li></Link>
                    </ul>
                </div>
            </div>
            )
        } else {
            return null
        }

    }
}

export default SideNav;