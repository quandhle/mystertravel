import React, {Component} from 'react';
import './previous.scss';
import axios from 'axios';

class PreviousTrips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        }
    }

    async componentDidMount() {
        const resp = await axios.get('/api/getprevioustrip.php');

        this.setState({
            trips: resp.data.data
        })
    }

    render() {
        const {trips} = this.state;
        
        let tripsButton = trips.map(item => {

            return (
                <div key={item.trips_id}>{item.trips_name}</div>
            )
        })

        return (
            <div className="previous-page">{tripsButton}</div>
        )
    }
}

export default PreviousTrips;