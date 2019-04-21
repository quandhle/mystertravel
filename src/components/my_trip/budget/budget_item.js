import React from 'react';
import {formatMoney, formatEntries} from '../../../helper';

export default props =>{
    const {budgetItem, deleteBudgetItem} = props;
    console.log('here')
    return(
        <div key={budgetItem.budget_id} className="budget">
            <div className="budget-descrip">{formatEntries(budgetItem.description)}</div>
            <div className="budget-amount">{formatMoney(budgetItem.price)}</div>
            <div className="budget-item">{formatEntries(budgetItem.category)}</div>
            <div className="budget-delete">
                <button className="btn" onClick={() => { deleteBudgetItem(budgetItem) }}><i className="far fa-trash-alt"></i></button>
            </div>
        </div>
    )
}