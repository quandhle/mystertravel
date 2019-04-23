import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './summary.scss';
import {formatMoney} from './../../../helper/index';

import summaryimg from '../../../assets/images/summary.jpg';
import thinkingEmoji from '../../../assets/images/thinking-emoji.png';

class EndTrip extends Component{
    state = {
        tripName: '',
        totalSpent: 0,
        lastNote: '',
        region: ''
    };

    componentDidMount() {
        this.getSummaryData();
    }

    async getSummaryData() {
        debugger;
        const {trips_id} = this.props.trips_id;
        const response = await axios.get(`/api/getendtripsummary.php?trips_id=${trips_id}`);

        if (response.data.success) {
            const {trips_name, region, total_budget, last_entry} = response.data.data;
            this.setState({
                tripName: trips_name,
                totalSpent: total_budget,
                lastNote: last_entry,
                region: region
            });
        }
    }

    render(){
        const {tripName, totalSpent, region, lastNote} = this.state;
        const {trips_id} = this.props.trips_id;

        if (trips_id > 0) {
            return(
                <div className="summary-page">
                    <div className="summary-trip-name">
                        <p>{`${tripName}`}</p>
                    </div>
                    <div className="summary-region">
                        <p>{`A trip to ${region}`}</p>
                    </div>
                    <div className="total-spend">
                        <p>{`Total spent in this trip: ${formatMoney(totalSpent)}`}</p>
                    </div>
                    <div className="last-entry">
                        <div className="entry-content">
                            <img src={summaryimg} alt="temp"/>
                            <p>{lastNote}</p>
                        </div>
                        <div className="share-btns col-12">
                            <div className="facebook"><i className="fab fa-facebook-square"></i></div>
                            <div className="twitter"><i className="fab fa-twitter-square"></i></div>
                            <div className="gmail"><i className="fas fa-envelope-square"></i></div>
                        </div>
                    </div>
                    <div className="summary-end-trip-link">
                        <button className="summary-end-trip-link-btn btn disabled">End Trip</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="summary-fail-page">
                    <div className="summary-fail-title">
                        <p>Dude, where's your trip?</p>
                    </div>
                    <div className="summary-fail-image">
                        <img src={thinkingEmoji} alt="temp"/>
                    </div>
                    <div className="summary-fail-text">
                        <p>It looks like you haven't done anything on this trip yet! Go forth and venture!</p>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        trips_id: state.trips_id
    };
}

export default connect(mapStateToProps)(EndTrip);