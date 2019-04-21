import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';


const NotesInput = props =>{
    const {notes, handleSubmit, style} = props;
        return (
            <form onSubmit={handleSubmit(notes)} style={style} className="note-input-form">
                <Field id="notes" name="notes" label="Enter Note" component={Input} classes="notes-input"/>
                <button className="btn add-notes">Add</button>
            </form>
        ) 
}

export default reduxForm({
    form: 'notes-form'
})(NotesInput);
