import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';

const BudgetForm = props => {
    const {show, budget, handleSubmit} = props;

    if (show) {
        return(
            <form onSubmit={handleSubmit(budget)}>
                    <Field id="item" name="item" label="Item" component={Input} classes="budget-input" />
                    <Field id="amount" name="amount" label="Amount" component={Input} classes="budget-input"/>
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
