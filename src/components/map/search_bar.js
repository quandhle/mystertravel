import React from 'react';
import {Field, reduxForm} from 'redux-form';

import Input from './../general/input';

const SearchBar = props => {
    const {handleSubmit, handleClear, search} = props;
    return (
        <form onSubmit={handleSubmit(search)} className="search-bar-form">
            <Field id="places" name="places" label="Enter a location" component={Input} classes="search-bar-field"/>
            <button className='search-bar-clear-button'>
                <i className="fas fa-times-circle"/></button>
        </form>
    );
}

export default reduxForm({
    form: 'search-bar-form'
})(SearchBar);