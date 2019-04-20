import React, {Component} from 'react';
import axios from 'axios';
import BudgetForm from './budget_form';
import './budget.scss';
import {formatMoney, formatEntries} from '../../../helper';

class Budget extends Component{
    constructor(props) {
        super(props)

        this.state = {
            showInput: {
                height: 0
            },
            budget: [],
            trips_id: 1
        }

        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async handleInput(value) {
        const {trips_id} = this.state;
        const resp = await axios.post('/api/addbudgetitem.php', {
            trips_id,
            description: value.description,
            price: parseInt(value.price * 100),
            category: value.category
        });
        if(resp.data.success){
            value.description = '';
            value.price = '';
            value.category = '';
            this.getBudgetList();
        } else {
            console.error('Unable to add entry');
        }
    }

    async deleteBudgetItem(budgetItem) {
        const {trips_id} = this.state;
        const resp = await axios.put('/api/deletebudgetitem.php', {
            trips_id,
            budget_id: budgetItem.budget_id,
        });
        if(resp.data.success){
            this.getBudgetList();
        } else {
            console.error('Unable to delete entry');
        }
    }

    toggleInput() {
        const {height} = this.state.showInput;

        if(!height){
            this.setState({
                showInput: {
                    height: '230px'
                }
            })
        } else {
            this.setState({
                showInput: {
                    height: 0
                }
            })
        }

        // need way to render and update budget list
    }

    async getBudgetList() {
        const {trips_id} = this.state;
        const resp = await axios.get(`/api/getbudgetlist.php?trips_id=${trips_id}`);
        if (resp.data.success) {
            this.setState({
                budget: resp.data.budget
            });
        } else {
            console.error(resp.data.error);
        }
    }

    componentDidMount(){
        this.getBudgetList();
    }

    render() {
        const {budget, showInput} = this.state;
        const budgetList = budget.map(budgetItem => {
            return(
                <div key={budgetItem.budget_id} className="budget">
                        <div className="budget-descrip">{formatEntries(budgetItem.description)}</div>
                        <div className="budget-amount">{formatMoney(budgetItem.price)}</div>
                        <div className="budget-item">{formatEntries(budgetItem.category)}</div>
                        <div className="budget-delete">
                            <button className="btn" onClick={() => { this.deleteBudgetItem(budgetItem) }}><i className="far fa-trash-alt"></i></button>
                        </div>

                </div>
            );
        });

        return(
            <div className="budget-page">
                <div className="budget-input-toggle" onClick={this.toggleInput}>Add Budget Item <i className="fas fa-angle-double-down"></i>
                </div>
                <BudgetForm budget={this.handleInput} style={showInput}/>
                <div className="budget-box">
                    {budgetList}
                </div>
            </div>
        )
    }
}

export default Budget;
