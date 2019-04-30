import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { updateNote} from '../../../actions';

import axios from 'axios';

import Textarea from '../../general/textarea';
import Modal from '../../general/modal';


class UpdateNote extends Component{
    constructor(props){
        super(props)

        this.updatedb = this.updatedb.bind(this);
    }
    async updatedb(value){
        console.log('update', this.props)  
        const {trips_id, note, display, close} = this.props
        const resp = await axios.post('/api/updatenote.php', {
            id: note.note_id,
            description: value.entry, 
            trips_id
        });

        if(resp.data.success){
            display();
        }
        
        close();
    }
    render(){
        const {modal, close, handleSubmit} = this.props;
        return(
            <Modal open={modal} childrenStyle="update-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <div className="map-modal-header">Edit note?</div>
                <form onSubmit={handleSubmit(this.updatedb)}>
                <Field id="entry" name="entry" label="Enter Note" component={Textarea} classes="notes-input" />
                </form>
                <button className="btn updatebutton" onClick={handleSubmit(this.updatedb)} >Update</button>
            </Modal>  
        )
    }
}

function mapStateToProps(state, props){
    // console.log('Props:', props);
    const { modal, note } = props;
    return {
        initialValues: {
            entry: modal ? note.entry : ''
        },
        trips_id: state.trips_id.trips_id,
    }
}

function validate({entry}){
    const errors = {};
    if(!entry){
        errors.entry = 'Update notes can not be empty';
    }
    return errors;
}

UpdateNote = reduxForm({
    form: 'initializeFromState',
    enableReinitialize: true,
    validate
  })(UpdateNote)
  
  
UpdateNote = connect( mapStateToProps)(UpdateNote)
  
export default UpdateNote