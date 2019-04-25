import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { updateNote} from '../../../actions';

import Textarea from '../../general/textarea';
import Modal from '../../general/modal';


class UpdateNote extends Component{
    constructor(props){
        super(props)

        this.updatedb = this.updatedb.bind(this);
    }
    async updatedb(value){
        console.log('update',value)       
    }
    render(){
        const {modal, close, handleSubmit} = this.props;
        return(
            <Modal open={modal} childrenStyle="update-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <div className="map-modal-header">Do you want to add a pin? </div>
                <form onSubmit={handleSubmit(this.updatedb)}>
                <Field id="entry" name="entry" label="Enter Note" component={Textarea} classes="notes-input" />
                </form>
                <button id="update" className="" onClick={handleSubmit(this.updatedb)} >Update</button>
            </Modal>  
        )
    }
}

function mapStateToProps(state, props){
    console.log('Props:', props);
    const { modal, note } = props;
    return {
        initialValues: {
            entry: modal ? note.entry : ''
        },
        trips_id: state.trips_id,
    }
}

UpdateNote = reduxForm({
    form: 'initializeFromState',
    enableReinitialize: true
  })(UpdateNote)
  
  
UpdateNote = connect( mapStateToProps)(UpdateNote)
  
export default UpdateNote