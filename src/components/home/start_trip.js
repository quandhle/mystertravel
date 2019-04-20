import React, {Component} from 'react';
import axios from 'axios';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {passTripId} from '../../actions';
import Modal from '../general/modal';
import Input from '../general/input';


class StartTrip extends Component {
    constructor(props){
        super(props);
        this.nameTrip = this.nameTrip.bind(this);
    }
    async nameTrip(value){
        const resp = await axios.post('/api/starttrip.php', {
            trips_name: value.tripname,
            region: 'usa'
        })
        
        const {success, trips_id} = resp.data

        if(success){
            this.props.passTripId(trips_id);
        } else {
            console.error('can not start trip');
        }
        this.props.close();
    }

    render() {
        const {handleSubmit, modal} = this.props
        return (
                <Modal open={modal} childrenStyle="home-modal">
                    <div className="homepage-modal-header">Give your trip a name!</div>
                    <form onSubmit={handleSubmit(this.nameTrip)}>
                         <Field id="tripname" name="tripname" label="" component={Input} classes="start-input" col=" "/>
                         <button onClick={handleSubmit(this.nameTrip)} className="btn start-trip-btn"><i className="far fa-grin-wink"></i> Bon Voyage</button>
                    </form> 

                </Modal>
        )
    }
}

export default reduxForm({
    form: 'start-new-trip'
})(connect(null,{passTripId:passTripId})(StartTrip));