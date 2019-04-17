import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SideNav from './sidenav';
import './nav.scss';

class Nav extends Component{
    render(){
        return(
            <nav className="navbar bg-light">
                <a href="/" className="navbar-brand">MysterTravel</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="#" className="nav-link"><i className="fas fa-bars"></i></a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;