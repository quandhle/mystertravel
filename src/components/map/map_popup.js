import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {passTripId} from '../../actions';
import Modal from '../general/modal';
import Input from '../general/input';

class MapPopUp extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const {handleSubmit, modal, close, addpin} = this.props
        return (
            <Modal open={modal} childrenStyle="map-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <div className="map-modal-header">Do you want to add a pin?</div>
                <form onSubmit={handleSubmit(addpin)}>
                    <Field id="pin-description" name="pin-description" label="Description for pin" component={Input} classes="description-input" col=" " autoFocus={true}/>
                    <button onClick={handleSubmit(addpin)} className="btn modal-pin-btn">Add Pin <i className="fas fa-map-marker-alt"/></button>
                </form> 
                <button onClick={handleSubmit(close)} className="btn cancel-add-btn">Cancel</button>
            </Modal>
        )
    }
}

export default reduxForm({
    form: 'pin-description'
})(MapPopUp);

{/* <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
<div className="map-modal-header">Do you want to add a pin? </div> */}