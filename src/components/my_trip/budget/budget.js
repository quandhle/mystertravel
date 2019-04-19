import React, {Component} from 'react';
import axios from 'axios';
import BudgetForm from './budget_form';
import './budget.scss';
import {formatMoney, formatEntries} from '../../../helper';

class Budget extends Component{
    constructor(props) {
        super(props)

        this.state = {
            showInput: false,
            budget: []
        }

        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(value) {
        const {description, price, category} = value;

        const resp = axios.post('/api/addbudgetitem.php', {
            trips_id: 1,
            description: description,
            price: parseInt(price),
            category: category
        }).then((resp) => {
            console.log(resp.data);
        })
    }

    toggleInput() {
        const {showInput} = this.state;

        if(showInput){
            this.setState({
                showInput: false
            })
        } else {
            this.setState({
                showInput: true
            })
        }

        // need way to render and update budget list
    }

    async getBudgetList() {
        const resp = await axios.get(`/api/getbudgetlist.php?trips_id=${1}`);
        if (resp.data.success) {
            this.setState({
                budget: resp.data.budget
            });
        } else {
            console.error(resp.data.error);
        }
    }

    deleteItem(budgetList) {
        console.log('delete button clicked', budgetList)
    }

    componentDidMount(){
        this.getBudgetList();
    }

    render() {
        const {budget} = this.state;
        console.log(budget)
        const budgetList = budget.map((budgetItem, index) => {
            return(
                <div key={index} className="budget">
                    <div className="budget-item">{formatEntries(budgetItem.category)}</div>
                    <div className="budget-amount">{formatMoney(budgetItem.price)}</div>
                    <button className="budget-delete" onClick={this.deleteItem}>-</button>
                </div>
            );
        });

        return(
            <div className="budget-page">
                <div className="budget-input-toggle" onClick={this.toggleInput}>
                Add Budget Item <i className="fas fa-plus"></i>
                </div>

                <BudgetForm budget={this.handleInput} show={this.state.showInput}/>

                <div className="budget-box">
                    {budgetList}
                </div>
            </div>
        )
    }
}

export default Budget;
