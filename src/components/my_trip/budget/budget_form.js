import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';

const BudgetForm = props =>{
    const {show, budget, handleSubmit} = props;

    if(show){
        return(
            <form onSubmit={handleSubmit(budget)}>
                <div className="row">
                    <Field id="item" name="item" label="Item" component={Input}/>
                    <Field id="amount" name="amount" label="Amount" component={Input}/>
                </div>
                <button>Add</button>
            </form>
        )
    } else {
        return null;
    }

}


export default reduxForm({
    form: 'budget-form'
})(BudgetForm);
