import React, {Component} from 'react';
import axios from 'axios';

import './summary.scss';
import {formatMoney} from './../../../helper/index';

import summaryimg from '../../../assets/images/summary.jpg';

class EndTrip extends Component{
    state = {
        tripName: '',
        totalSpent: 0,
        lastNote: '',
        trips_id: 1,     // this should read from redux state or php session eventually
        region: ''
    };

    componentDidMount() {
        this.getSummaryData();
    }

    async getSummaryData() {
        const response = await axios.get(`/api/getendtripsummary.php?trips_id=${this.state.trips_id}`);

        if (response.data.success) {
            const {trips_name, region, total_budget, last_entry} = response.data.data;
            console.log(response.data.data);
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

        return(
            <div className="endtrip-page">
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
            </div>
        )
    }
}

export default EndTrip;