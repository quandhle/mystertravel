import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';


const NotesInput = props =>{
    const {notes, handleSubmit, show} = props;

    if(show){
        return (
            <form onSubmit={handleSubmit(notes)}>
                <Field id="notes" name="notes" label="Enter Note" component={Input} classes="notes-input"/>
                <button className="btn btn-danger add-notes">Add</button>
            </form>
        ) 
    } else {
        return null;
    }

}


export default reduxForm({
    form: 'budget-form'
})(NotesInput);