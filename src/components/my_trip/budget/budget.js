import React, {Component} from 'react';
import BudgetForm from './budget_form';
import './budget.scss';

class Budget extends Component{
    constructor(props){
        super(props)

        this.state = {
            showInput: true
        }

        this.toggleInput = this.toggleInput.bind(this);
    }
    handleInput(value){
        console.log(value)
    }
    toggleInput(){
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

    }
    render(){
        return(
            <div className="budget-page">
                <div className="budget-input-toggle" onClick={this.toggleInput}>
                Add Budget Item <i className="fas fa-plus"></i>
                </div>
                <BudgetForm budget={this.handleInput} show={this.state.showInput}/>

                <div className="budget-box">
                    <div className="budget">
                        <div className="budget-item">Plane Ticket</div>
                        <div className="budget-amount">$ 500</div>
                    </div>
                    <div className="budget">
                        <div className="budget-item">Hotel</div>
                        <div className="budget-amount">$ 550</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Budget;