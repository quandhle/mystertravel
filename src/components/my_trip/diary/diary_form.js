import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';


const DiaryInput = props =>{
    const {diary, handleSubmit, show} = props;

    if(show){
        return (
            <form onSubmit={handleSubmit(diary)}>
                <Field id="diary" name="diary" label="Enter Diary" component={Input}/>
            </form>
        ) 
    } else {
        return null;
    }

}


export default reduxForm({
    form: 'budget-form'
})(DiaryInput);