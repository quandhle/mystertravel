import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Textarea from '../../general/textarea';


const NotesInput = props =>{
    const {notes, handleSubmit, style} = props;
        return (
            <form onSubmit={handleSubmit(notes)} style={style} className="note-input-form">
                <Field id="notes" name="notes" label="Enter Note" component={Textarea} classes="notes-input"/>
                <div><button className="btn add-notes">Add</button></div>
            </form>
        ) 
}

export default reduxForm({
    form: 'notes-form'
})(NotesInput);
