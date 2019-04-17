import React, {Component} from 'react';

import SideNav from './sidenav';
import './nav.scss';

class Nav extends Component{
    constructor(props){
        super(props);

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
    
                    <div className="nav-menu" onClick={this.toggleSideNav}>
                        <a href="#" className="nav-link">
                            <i className="fas fa-bars"></i>
                        </a>
                    </div>
                    <div className="nav-title">
                        <h2>MysterTravel</h2>
                    </div>


                </nav>
                <SideNav open={this.state.sideNav} toggle={this.toggleSideNav}/>
            </div>

        );
    }
}

export default Nav;