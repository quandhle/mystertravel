import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SideNav from './sidenav';
import './nav.scss';

class Nav extends Component{
    constructor(props){
        super(props)

        this.state ={
            sideNav: false
        }
    }
    toggleSideNav= ()=> {
        const {sideNav} = this.state;
        if(sideNav){
            this.setState({
                sideNav: false
            })
        } else {
            this.setState({
                sideNav:true
            })
        }
    }
    render(){
        return(
            <div className="nav-box">
                <nav className="navbar bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={this.toggleSideNav}>
                            <a href="#" className="nav-link"><i className="fas fa-bars"></i></a>
                        </li>
                    </ul>
                    <div className="navbar-header"><a href="/">MysterTravel</a></div>
                </nav>
                <SideNav open={this.state.sideNav}/>
            </div>

        );
    }
}

export default Nav;