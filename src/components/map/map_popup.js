import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import Modal from '../general/modal';
import Input from '../general/input';

class MapPopUp extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {handleSubmit, modal, close, addpin} = this.props;

        return (
            <Modal open={modal} childrenStyle="map-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <div className="map-modal-header">Add pin here?</div>
                <form onSubmit={handleSubmit(addpin)}>
                    <Field id="pin_description" name="pin_description" label="i.e. Very nice restaurant..." component={Input} classes="description-input" col=" " autoFocus={true}/>
                    <button onClick={handleSubmit(addpin)} className="btn modal-pin-btn">Add Pin <i className="fas fa-map-marker-alt"/></button>
                </form> 
                <button onClick={handleSubmit(close)} className="btn cancel-add-btn">Cancel</button>
            </Modal>
        );
    }
}

function validate({pin_description}) {
    const errors = {};
    if(!pin_description) {
        errors.pin_description = 'Write something for this pin';
    }
    
    return errors;
}

export default reduxForm({
    form: 'pin_description',
    validate
})(MapPopUp);
