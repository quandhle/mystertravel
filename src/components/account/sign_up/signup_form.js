import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';

const signUpForm = props =>{
    const {signUp, handleSubmit} = props
    return(
        <form onSubmit={handleSubmit(signUp)} className="sign-up-form">
            <div className="sign-up-title">Sign Up</div>
            <Field id="nickname" name="nickname" label="Name to display" component={Input} classes="signup-input"/>
            <Field id="email" name="email" label="Enter Email" component={Input} classes="signup-input"/>
            <Field id="password" name="password" label="Enter Password" component={Input} classes="signup-input" type="password"/>
            <Field id="confirm_password" name="confirm_password" label="Confirm Password" component={Input} classes="signup-input" type="password"/>
            <div className="signup-btn">
                <button className="btn">Sign Up</button>
            </div>
        </form>
    )
}

function validate({nickname, email, password, confirm_password}){
    const errors = {};
    if(!nickname){
        errors.nickname = 'Please enter your name'; 
    }
    if(!email){
        errors.email = 'Please enter your email'; 
    }
    if(!password){
        errors.password = 'Please enter your password'; 
    }
    if(password != confirm_password || !confirm_password){
        errors.confirm_password = 'Password is not match'; 
    }
    return errors;
}

export default reduxForm({
    form: 'sign-up-form',
    validate
})(signUpForm);