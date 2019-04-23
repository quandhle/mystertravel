import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './summary.scss';
import {formatMoney} from './../../../helper';
import {clearTripId} from "../../../actions";
import {loadScript} from "./../../../helper";

import summaryimg from '../../../assets/images/summary.jpg';
import thinkingEmoji from '../../../assets/images/thinking-emoji.png';

class EndTrip extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tripName: '',
            totalSpent: 0,
            lastNote: '',
        };

        this.paramTripsId = null;
        const {params} = this.props.match;
        if (params && params.trips_id) {
            this.paramTripsId = params.trips_id;
        }
    }

    componentDidMount() {
        this.getSummaryData();
        
        loadScript('https://connect.facebook.net/en_US/sdk.js');
        window.fbAsyncInit = function() {
            FB.init({
                appId            : '2052844328350812',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.2'
            });
        };

        loadScript('https://platform.twitter.com/widgets.js');
    }

    async getSummaryData() {
        const trips_id = this.paramTripsId ? this.paramTripsId : this.props.trips_id.trips_id;

        const response = await axios.get(`/api/getendtripsummary.php?trips_id=${trips_id}`);
        if (response.data.success) {
            const {trips_name, total_budget, last_entry} = response.data.data;
            this.setState({
                tripName: trips_name,
                totalSpent: total_budget,
                lastNote: last_entry
            });
        }
    }

    endTrip = async () => {
        const {trips_id} = this.props.trips_id;
        const response = await axios.put('/api/endcurrenttrip.php', {
            trips_id: trips_id
        });

        if (response.data.success) {
            this.props.clearTripId();
            this.props.history.push(`/`);
            // for now, we push the user back to the home page
            // eventually, send them to their public summary page
            // (the one you get when you click on a shared link)
        }
    }

    fbButton = (url) => {
        FB.ui({
            method: 'share',
            display: 'popup',
            href: url,
        }, function(response){});
    }

    twitterButton = (url) => {
        return encodeURIComponent(`I went on a trip recently! Check it out on MysterTravel!\n${url}`);
    }

    mailButton(url) {
        return `mailto: ?subject=${'I went on a trip!'}&body=${
            encodeURIComponent(`I went on a trip recently! Check it out on MysterTravel!\n${url}`)
        }`;
    }

    render(){
        const {tripName, totalSpent, lastNote} = this.state;
        const trips_id = this.paramTripsId ? this.paramTripsId : this.props.trips_id.trips_id;
        const paramTripsId = this.paramTripsId;
        const summaryURL = `http://www.mystertravel.com/trip/${trips_id}`;

        if (trips_id > 0 && tripName) {
            return(
                <div className="summary-page">
                    <div className="summary-trip-name">
                        <p>{`${tripName}`}</p>
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
                            <div className="facebook" id='facebook-div'>
                                <a onClick={() => {this.fbButton(summaryURL)}}><i className="fab fa-facebook-square"></i></a>
                            </div>
                            <div className="twitter">
                                <a href={`https://twitter.com/intent/tweet?text=${this.twitterButton(summaryURL)}`}>
                                    <i className="fab fa-twitter-square"></i>
                                </a>
                            </div>
                            <div className="gmail">
                                <a href={this.mailButton(summaryURL)}>
                                    <i className="fas fa-envelope-square"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    {!paramTripsId &&
                        <div className="summary-end-trip-link">
                            <button onClick={this.endTrip} className="summary-end-trip-link-btn btn">End Trip</button>
                        </div>
                    }
                </div>
            )
        } else {
            return (
                <div className="summary-fail-page">
                    <div className="summary-fail-title">
                        <p>Yo, where's your trip?</p>
                    </div>
                    <div className="summary-fail-image">
                        <img src={thinkingEmoji} alt="temp"/>
                    </div>
                    <div className="summary-fail-text">
                        <p>This trip doesn't exist! Venture forth! (and log it!)</p>
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

export default connect(mapStateToProps, {
    clearTripId: clearTripId
})(EndTrip);