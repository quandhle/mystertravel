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
                    <div className="homepage-modal-header">Where are you going? </div>
                    <form onSubmit={handleSubmit(this.nameTrip)}>
                         <Field id="tripname" name="tripname" label="Name you trip" component={Input} classes="start-input"/>
                    </form> 
                    <button onClick={handleSubmit(this.nameTrip)} className="btn start-trip-btn">GO</button>
                </Modal>
        )
    }
}

export default reduxForm({
    form: 'start-new-trip'
})(connect(null,{passTripId:passTripId})(StartTrip));