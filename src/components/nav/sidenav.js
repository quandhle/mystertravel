import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SideNav extends Component{
    render() {
        const {style:{body, background}, toggle} =this.props

        return(
        <div className="side-nav-box" onClick={toggle} style={background}>
            <div className="side-nav" style={body}>
                <div className="side-nav-links">
                    <Link to="/mytrip">Current Trip</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
        )
    }
}

export default SideNav;