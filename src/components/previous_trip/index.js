import React, {Component} from 'react';
import {connect} from 'react-redux';
import './previous.scss';
import axios from 'axios';
import TripList from './trip_list';
import {signIn} from '../../actions';

class PreviousTrips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        }
    }

    async checkLogin() {
        const resp = await axios.get(`/api/checkloggedin.php?token=${localStorage.getItem('token')}`);
        const {success, login} = resp.data;
        const {signIn} = this.props;

        if(success) {
            if(login) {
                signIn(resp.data);
                this.getPreviousTrip();
            }
        }
    }

    async getPreviousTrip(){
        const resp = await axios.get('/api/getprevioustrip.php');
        console.log(resp.data)
        this.setState({
            trips: resp.data.data
        });
    }

    componentDidMount() {
        this.checkLogin();
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

 export default connect(null, {
     signIn
 })(PreviousTrips);
