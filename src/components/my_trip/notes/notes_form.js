import React from 'react';
import {reduxForm, Field} from 'redux-form';

import Textarea from '../../general/textarea';
import FileInput from '../../general/fileinput';

const NotesInput = props =>{
    const {notes, handleSubmit, style} = props;
    const backup = `<input type="file" name="fileToUpload" id="fileToUpload" />`;

    return (
        <form onSubmit={handleSubmit(notes)} style={style} className="note-input-form">
            <Field id="notes" name="notes" label="Enter Note" component={Textarea} classes="notes-input" />
            <div className="chooseFile">
                <Field id='imageUpload' class='imageUpload' name='imageUpload' component={FileInput} className="fileName"/>
                <button className="btn add-notes">Add</button>
            </div>
        </form>

    )
}

function validate({notes}){
    const errors = {};
    if(!notes){
        errors.notes = 'Your note is empty';
    }
    return errors;
}

export default reduxForm({
    form: 'notes-form',
    validate
})(NotesInput);
