import React, {Component, Fragment} from 'react';
import SideNav from './sidenav';
import './nav.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component {
    constructor(props){
        super(props);

        this.state ={
            sideNav: {
                body:{width: 0},
                background:{width: 0} 
            },
        };
    }

    toggleSideNav= ()=> {
        const {body} = this.state.sideNav;

        if(body.width === 0) {
            this.setState({
                sideNav: {
                    body:{width: '70%'},
                    background:{width: '100%'} 
                }
            });
        } else {
            this.setState({
                sideNav:{
                    body:{width: 0},
                    background:{width: 0} 
                }
            });
        }
    }

    signInUser() {
        const {trips_id} = this.props;

        if(trips_id) {
            return[
                {
                    to: '/mytrip',
                    text: 'Current Trip'
                },
                {
                    to: '/previoustrips',
                    text: 'Previous Trips'
                },
                {
                    to: '/account/signout',
                    text: 'Sign Out'
                }
            ];
        } else {
            return[
                {
                    to: '/',
                    text: 'Home'
                },
                {
                    to: '/previoustrips',
                    text: 'Previous Trips'
                },
                {
                    to: '/account/signout',
                    text: 'Sign Out'
                }
            ];
        }
    }

    guest() {
        const {trips_id} = this.props;

        if(trips_id) {
            return [
                {
                    to: '/mytrip',
                    text: 'Current Trip'
                },
                {
                    to: '/account/signin',
                    text: 'Sign In'
                },
                {
                    to: '/account/signup',
                    text: 'Sign Up'
                }
            ];
        } else {
            return [
                {
                    to: '/',
                    text: 'Home'
                },

                {
                    to: '/account/signin',
                    text: 'Sign In'
                },
                {
                    to: '/account/signup',
                    text: 'Sign Up'
                }
            ];
        }
    }

    renderLinks() {
        const {guest, userAuth} = this.props;
        let navlink = null;

        if(!guest && userAuth) {
            navlink = this.signInUser();
        } else {
            navlink = this.guest();
        }

        let links = navlink.map(this.buildLink);

        return (
            <Fragment>
              {links}  
            </Fragment>
        );
    }

    buildLink(link) {
        return (
            <li key={link.to}><Link to={link.to}>{link.text}</Link></li>
        );
    }

    render() {
        const links = this.renderLinks();
        const {sideNav, greeting} = this.state;


        return (
            <div className="nav-box">
                <nav className="navbar">
                    <div className="nav-menu" onClick={this.toggleSideNav}>
                        <a href="#" className="nav-link">
                            <i className="fas fa-bars"></i>
                        </a>
                    </div>
                    <div className="nav-title">
                        <h1>MysterTravel</h1>
                    </div>
                    <div className="navbar-links">
                        <ul>
                            {links}
                        </ul>   
                    </div>
                </nav>
                <SideNav style={sideNav} toggle={this.toggleSideNav} links={links} greeting={greeting}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        trips_id: state.user.trips_id,
        userAuth: state.user.auth,
        guest: state.user.guest
    }
}

export default connect(mapStateToProps)(Nav);
