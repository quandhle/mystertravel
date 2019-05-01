import React, {Component} from 'react';

import './my_trip.scss';

class MyTrip extends Component{
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

    render(){
        return(
            <div className="my-trip">
                <div className="mytrip-greeting">My Trip Log</div>
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
        )
    }
}

export default MyTrip;
