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
                <div className="budget-link">
                    <button className="budget-link-btn btn" onClick={this.goToBudget}>Budget</button>
                </div>
                <div className="notes-link">
                    <button className="notes-link-btn btn" onClick={this.goToNotes}>Notes</button>
                </div>
                <div className="map-link">
                    <button className="map-link-btn btn" onClick={this.goToMap}>View Map</button>
                </div>
                <div className="end-trip-link">
                    <button className="end-trip-link-btn btn"  onClick={this.goToSummary}>Trip Summary</button>
                </div>
            </div>
        )
    }
}

export default MyTrip;