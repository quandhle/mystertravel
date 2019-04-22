import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';

const signInForm = props =>{
    const {signIn, handleSubmit} = props
    return(
        <form onSubmit={handleSubmit(signIn)} className="sign-in-form">
            <Field id="email" name="email" label="Enter Email" component={Input} classes="signin-email"/>
            <Field id="password" name="password" label="Enter Password" component={Input} classes="signin-password" type="password"/>
            <button className="btn signin-btn">Sign In</button>
        </form>
    )
}

function validate({email, password}){
    const errors = {};
    if(!email){
        errors.email = 'Please enter your email'; //has to name email exact same thing as the name="email"
    }
    if(!password){
        errors.password = 'Please enter your password'; 
    }
    return errors;
}

export default reduxForm({
    form: 'sign-in-form',
    validate
})(signInForm);