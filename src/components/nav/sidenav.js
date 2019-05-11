import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SideNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style:{body, background}, toggle, links, userName} =this.props;

        return (
            <div className="side-nav-box" onClick={toggle} style={background}>
                <div className="side-nav" style={body}>
                    <div className="nav-profile">
                        <div className="username">Hi, {userName? userName.split(' ')[0]: 'Guest'} <i className="fas fa-luggage-cart"></i></div>
                    </div>
                    <ul className="side-nav-links">
                        {links}
                    </ul> 
                    <ul className="aboutus-link">
                        <li><Link to="/aboutus" >About the Team</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        userName: state.user.username
    }
}

export default connect(mapStateToProps)(SideNav);
