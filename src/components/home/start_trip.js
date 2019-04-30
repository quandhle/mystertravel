import React, {Component} from 'react';
import axios from 'axios';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {passTripId} from '../../actions';
import Modal from '../general/modal';
import Input from '../general/input';


class StartTrip extends Component {
    constructor(props) {
        super(props);
        this.nameTrip = this.nameTrip.bind(this);
    }
    
    async nameTrip(value) {
        const resp = await axios.post('/api/starttrip.php', {
            trips_name: value.tripname
        })
        const {success, trips_id} = resp.data
        
        if(success) {
            this.props.passTripId(trips_id);
            this.props.close();
            this.props.history.push('/mytrip');
        } else {
            console.error('can not start trip');
            console.error(resp);
        }
    }
    
    render() {
        const {handleSubmit, modal, close} = this.props
        return (
            <Modal open={modal} childrenStyle="home-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <div className="homepage-modal-header"><strong>Start A Trip</strong><br/>Give your trip a name!</div>
                <form onSubmit={handleSubmit(this.nameTrip)}>
                    <Field id="tripname" name="tripname" label="i.e. Graduation Trip..." component={Input} classes="start-input" col=" " autoFocus={true} />
                    <div><button onClick={handleSubmit(this.nameTrip)} className="btn start-trip-btn"><i className="far fa-grin-wink"></i> Bon Voyage</button></div>
                </form> 
            </Modal>
        )
    }
}

function validate({tripname}) {
    const errors = {};
    if(!tripname){
        errors.tripname = 'Please name your trip';
    }
    return errors;
}

export default reduxForm({
    form: 'start-new-trip',
    validate
})(connect(null,{passTripId:passTripId})(StartTrip));
