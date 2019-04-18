import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';
import Dropdown from '../../dropdown/dropdown';

const BudgetForm = props => {
    const {show, budget, handleSubmit} = props;

    if (show) {
        return(
            <form onSubmit={handleSubmit(budget)}>
                    <Field id="description" name="description" label="Description" component={Input} classes="budget-input" />
                    <Field id="price" name="price" label="Amount" component={Input} classes="budget-input"/>
                    <Field id="category" name="category" label="Category" component={Input} classes="budget-input"/>
                <button className="btn btn-danger add-budget">Add</button>
            </form>
        )
    } else {
        return null;
    }
}

export default reduxForm({
    form: 'budget-form'
})(BudgetForm);
