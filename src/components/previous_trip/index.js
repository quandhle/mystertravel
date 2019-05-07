import React, {Component} from 'react';
import './previous.scss';
import axios from 'axios';
import TripList from './trip_list';

class PreviousTrips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        }
    }

    async componentDidMount() {
        const resp = await axios.get('/api/getprevioustrip.php');
        console.log(resp.data)
        this.setState({
            trips: resp.data.data
        });
    }

    render() {
        const {trips} = this.state;
        
        let tripsList = trips.map(item => {
            return <TripList key={item.trips_id} item={item}/>;
        })

        return (
            <div className="previous-page">{tripsList}</div>
        );
    }
}

export default PreviousTrips;
