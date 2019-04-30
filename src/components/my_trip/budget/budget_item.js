import React, {Component} from 'react';
import {formatMoney, formatEntries} from '../../../helper';
import UpdateBudget from './update_budget';

class BudgetItem extends Component{
    state ={
        modal: false
    }
    toggleModal= ()=>{
        this.setState({
            modal: !this.state.modal
        })   
    }
    render(){
        const {budgetItem, deleteBudgetItem, display} = this.props;
        return(
            <div key={budgetItem.budget_id} className="budget">
                <div className="budget-descrip">{formatEntries(budgetItem.description)}</div>
                <div className="budget-amount"><div>$ {formatMoney(budgetItem.price)}</div></div>
                <div className="budget-item">{formatEntries(budgetItem.category)}</div>
                <div className="btn budget-icon" onClick={() => { this.toggleModal()} }><i className="fas  fa-edit"></i></div>
                <div className="budget-delete">
                    <button className="btn budget-icon" onClick={() => { deleteBudgetItem(budgetItem) }}><i className="far fa-trash-alt"></i></button>
                </div>
                <UpdateBudget modal={this.state.modal} budget={budgetItem} close={this.toggleModal} display={display}/>
            </div>
        )
    }

}

export default BudgetItem
