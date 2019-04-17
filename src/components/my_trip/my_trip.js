import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class MyTrip extends Component{
    render(){
        return(
            <div className="my-trip">
                <div className="budget-link">
                    <button className="budget-link-btn">Budget</button>
                </div>
                <div className="diary-link">
                    <button className="diary-link-btn">Diary</button>
                </div>
                <div className="end-trip-link">
                    <button className="end-trip-link-btn">End Trip</button>
                </div>
            </div>
        )
    }
}

export default MyTrip;