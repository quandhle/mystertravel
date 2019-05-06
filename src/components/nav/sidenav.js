import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from "axios";


class SideNav extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.checkLogin();
    }

    async checkLogin(){
        const resp = await axios.get(`/api/checkloggedin.php?token=${localStorage.getItem('token')}`);

        const {success, login} = resp.data;
        const {signIn} = this.props;
        if(success) {
            if (login) {
                signIn(resp.data);
            }
        }
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
                    to: '/posttrip',
                    text: 'Previous Trips'
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
                    to: '/posttrip',
                    text: 'Previous Trips'
                },
                {
                    to: '/account/signout',
                    text: 'Sign Out'
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

        const {guest, userAuth, userName} = this.props;
        let profile = 'Hi Guest';
        let navlink = null;
        if(!guest && userAuth){
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
                <ul className="aboutus-link">
                    <li><Link to="/aboutus" >About the Team</Link></li>
                </ul>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state){
    return{
        trips_id: state.user.trips_id,
        userAuth: state.user.auth,
        userName: state.user.username,
        guest: state.user.guest
    }
}

export default connect(mapStateToProps)(SideNav);