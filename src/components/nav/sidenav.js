import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class SideNav extends Component{
    constructor(props){
        super(props)
    }
    signInUser(){
        const {trips_id} = this.props;

        if(trips_id){
            return[
                {
                    to: '/mytrip',
                    text: 'Current Trip'
                },
                {
                    to: '/pervioustrip',
                    text: 'Pervious Trip'
                },
                {
                    to: '/account/signout',
                    text: 'Sign Out'
                }
            ]
        } else {
            return[
                {
                    to: '/',
                    text: 'Home'
                },
                {
                    to: '/account/signout',
                    text: 'Sign Out'
                },
                {
                    to: '/pervioustrip',
                    text: 'Previous Trip'
                }
            ]
        }
    }
    guest(){
        const {trips_id} = this.props;

        if(trips_id){
            return[
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
            ]
        } else {
            return[
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
            ]
        }
    }
    renderLinks(){
        const {userAuth, userName} = this.props;
        let profile = 'Hi Guest';
        let navlink = null;
        if(userAuth){
            profile = `Hi ${userName}`
            navlink = this.signInUser();
        } else {
            navlink = this.guest();
        }
        navlink = navlink.map(this.buildLink);

        return(
            <Fragment>
                <div className="nav-profile">
                    <div className="username">{profile} <i className="fas fa-luggage-cart"></i></div>
                </div>
                <ul className="side-nav-links">
                    {navlink}
                </ul> 
            </Fragment>
        )
    }
    buildLink(link){
        return(
            <li key={link.to}><Link to={link.to}>{link.text}</Link></li>
        )
    }
    render(){
        const {style:{body, background}, toggle} =this.props
        const links = this.renderLinks();
        return(
        <div className="side-nav-box" onClick={toggle} style={background}>
            <div className="side-nav" style={body}>
                {links}
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return{
        trips_id: state.trips_id.trips_id,
        userAuth: state.user.auth,
        userName: state.user.username
    }
}

export default connect(mapStateToProps)(SideNav);