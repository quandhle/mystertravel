import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './summary.scss';
import {formatMoney} from './../../../helper';
import {clearTripId} from "../../../actions";
import {loadScript} from "./../../../helper";
import keys from '../../../../api_keys';
import SummaryMap from './detached_map';
import Timeline from './timeline';

import summaryimg from '../../../assets/images/summary.jpg';
import thinkingEmoji from '../../../assets/images/thinking-emoji.png';

class Summary extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tripName: '',
            totalSpent: 0,
            lastNote: '',
            privatePage: null,
            trips_id: null,
            map: null,
            pinData: null
        };
    }

    componentDidMount() {
        const {params} = this.props.match;
        let privatePage, trips_id;

        if (params && params.trips_id) {
            privatePage = false;
            trips_id =  params.trips_id;
        } else {
            privatePage = true;
            trips_id = this.props.trips_id.trips_id;
        }

        this.setState({
            privatePage,
            trips_id
        }, this.getSummaryData);
        
        loadScript('https://connect.facebook.net/en_US/sdk.js');
        window.fbAsyncInit = function() {
            FB.init({
                appId            : keys.facebook,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.2'
            });
        };

        loadScript('https://platform.twitter.com/widgets.js');
    }

    async getSummaryData() {
        const {trips_id} = this.state;
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

    showMap() {
        //pins
        //center
    }

    async showPins() {
        const {trips_id} = this.state;
        const resp = await axios.get(`/api/getmappin.php?trips_id=${trips_id}`);

        let pinData = null;
        if (resp.data.success) {
            pinData = resp.data.data;
        }

        if(pinData) {
            this.setState({pinData});
        }
    }

    endTrip = async () => {
        const {trips_id} = this.state;
        const response = await axios.put('/api/endcurrenttrip.php', {trips_id});

        if (response.data.success) {
            this.props.clearTripId();
            this.props.history.push(`/`);
            // for now, we push the user back to the home page
        }
    }

    fbButton = (url) => {
        FB.ui({
            method: 'share',
            display: 'popup',
            href: url,
            quote: `I went on a trip recently! Check it out on MysterTravel!\n${url}`
        });
    }

    twitterButton(url) {
        return `https://twitter.com/intent/tweet?text=${
            encodeURIComponent(`I went on a trip recently! Check it out on MysterTravel!\n${url}`)
        }`;
    }

    mailButton(url) {
        return `mailto: ?subject=I went on a trip!&body=${
            encodeURIComponent(`I went on a trip recently! Check it out on MysterTravel!\n${url}`)
        }`;
    }

    render(){
        const {trips_id, tripName, totalSpent, lastNote, privatePage, pinData} = this.state;
        const summaryURL = `http://devtravelfuze.quandhle.com/trip/${trips_id}`;

        return(
            <div className="summary-page">
                <div className="summary-trip-name"><p>{`${tripName}`}</p></div>
                <div className="total-spend"><p>{`Total spent in this trip: ${formatMoney(totalSpent)}`}</p></div>
                <div className="share-btns col-12">
                    <a onClick={() => {this.fbButton(summaryURL)}}>
                        <i className="fab fa-facebook-square"/>
                    </a>
                    <a href={this.twitterButton(summaryURL)}>
                        <i className="fab fa-twitter-square"/>
                    </a>
                    <a href={this.mailButton(summaryURL)}>
                        <i className="fas fa-envelope-square"/>
                    </a>
                </div>
                <Timeline/>
                <div className="last-entry">
                    <div className="entry-content">
                        <img src={summaryimg} alt="temp"/>
                        <p>{lastNote}</p>
                    </div>
                </div>
                {privatePage &&
                    <div className="summary-end-trip-link">
                        <button onClick={this.endTrip} className="summary-end-trip-link-btn btn">End Trip</button>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        trips_id: state.trips_id
    };
}

export default connect(mapStateToProps, {
    clearTripId: clearTripId
})(Summary);