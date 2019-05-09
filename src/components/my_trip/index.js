import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../actions';
import './my_trip.scss';
import axios from "axios";

class MyTrip extends Component {
    componentDidMount() {
        this.checkLogin();
    }

    async checkLogin(){
        const resp = await axios.get(`/api/checkloggedin.php?token=${localStorage.getItem('token')}`);

        const {success, login, trips_id} = resp.data;
        const {signIn, history} = this.props;

        if(success) {
            if(login) {
                signIn(resp.data);

                if(!trips_id) {
                    history.push('/');
                }
            }
        } else {
            history.push('/');
        }
    }

    goToBudget = () => {
        this.props.history.push(`/mytrip/budget`);
    }

    goToNotes = () => {
        this.props.history.push(`/mytrip/notes`);
    }

    goToMap = () => {
        this.props.history.push(`/map`);
    }

    goToSummary = () => {
        this.props.history.push(`/mytrip/summary`);
    }

    render() {
        return (
            <div className="my-trip">
                <div className="mytrip-greeting">Current Trip Log</div>
                <div className="map-link">
                    <button className="map-link-btn btn" onClick={this.goToMap}>Pin on Map</button>
                </div>
                <div className="budget-link">
                    <button className="budget-link-btn btn" onClick={this.goToBudget}>Record Expenses</button>
                </div>
                <div className="notes-link">
                    <button className="notes-link-btn btn" onClick={this.goToNotes}>Write Notes</button>
                </div>
                <div className="end-trip-link">
                    <button className="end-trip-link-btn btn"  onClick={this.goToSummary}>Trip Summary & End</button>
                </div>
            </div>
        );
    }
}

export default connect(null, {
    signIn
})(MyTrip);
