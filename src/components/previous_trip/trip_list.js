import React, {Fragment} from 'react';
import {formatDate} from '../../helper';

const TripList = (props) => {
    const {trips_id, trips_name, start, end } = props.item;
    let userId = localStorage.getItem('user_id')
    const url = `https://www.mystertravel.com/trip/${userId}/${trips_name.split(" ").join("-")}/${trips_id}`;

    return (
        <Fragment>
            <div className="previous-trip">
                <a href={url} target="_blank">
                    <div className="trip-name">{trips_name}</div>
                </a>
            </div>
            <div className="trip-date">{formatDate(start).slice(4)} - {formatDate(end).slice(4)}</div>
        </Fragment>
    )
}

export default TripList;
