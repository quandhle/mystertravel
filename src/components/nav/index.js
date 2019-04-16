import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SideNav from './sidenav';
import './nav.scss';

class Nav extends Component{
    render(){
        return(
            <div className="nav-box row">
                <nav className="nav-bar col-xs-12">
                    <div className="nav-wrap">
                        <a href="" className="nav-menu">Menu</a>
                        <div className="nav-head">Myster Travel</div>
                    </div>
                </nav>
                <SideNav />
            </div>
        )
    }
}

export default Nav;