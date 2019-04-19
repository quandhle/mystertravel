import React, {Component} from 'react';

import SideNav from './sidenav';
import './nav.scss';

class Nav extends Component{
    constructor(props){
        super(props);

        this.state ={
            sideNav: {
                body:{width: 0},
                background:{width: 0} 
            }
        }
    }

    toggleSideNav= ()=> {
 
        const {body} = this.state.sideNav;
        if(body.width === 0){
            this.setState({
                sideNav: {
                    body:{width: '70%'},
                    background:{width: '100%'} 
                }
            })
        } else {
            this.setState({
                sideNav:{
                    body:{width: 0},
                    background:{width: 0} 
                }
            })
        }
    }

    render(){
        return(
            <div className="nav-box">
                <nav className="navbar">
    
                    <div className="nav-menu" onClick={this.toggleSideNav}>
                        <a href="#" className="nav-link">
                            <i className="fas fa-bars"></i>
                        </a>
                    </div>
                    <div className="nav-title">
                        <h2>MysterTravel</h2>
                    </div>
                </nav>
                <SideNav style={this.state.sideNav} toggle={this.toggleSideNav}/>
            </div>

        );
    }
}

export default Nav;