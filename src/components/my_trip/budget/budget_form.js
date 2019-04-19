import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';
import Dropdown from '../../dropdown/dropdown';

const BudgetForm = props => {
    const { budget, handleSubmit, style} = props;
        return(
            <form onSubmit={handleSubmit(budget)} className="budget-input-form" style={style}>
                    <Field id="description" name="description" label="Description" component={Input} classes="budget-input" />
                    <Field id="price" name="price" label="Amount" component={Input} classes="budget-input"/>
                    <Field id="category" name="category" label="Category" component={Input} classes="budget-input"/>
                <button className="btn add-budget">Add <i className="fas fa-check"></i></button>
            </form>
        )
}

export default reduxForm({
    form: 'budget-form'
})(BudgetForm);
