import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class SideNav extends Component{
    render(){
        const {style:{body, background}, toggle} =this.props


            return(
            <div className="side-nav-box" onClick={toggle} style={background}>
                <div className="side-nav" style={body}>
                    <ul className="side-nav-links">
                        <Link to="/mytrip"><li>Current Trip</li></Link>
                        <Link to="/aboutus"><li>About Us</li></Link>
                        <Link to="/"><li>Home</li></Link>
                    </ul>
                </div>
            </div>
            )
    }
}

export default SideNav;