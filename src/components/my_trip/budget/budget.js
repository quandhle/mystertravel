import React, {Component} from 'react';
import BudgetForm from './budget_form';
import './budget.scss';

class Budget extends Component{
    constructor(props){
        super(props)

        this.state = {
            showInput: false
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
                <div className="budges-container">
                    <div className="budget-input-toggle" onClick={this.toggleInput}>
                    Add Budget Item<i className="fas fa-plus"></i>
                    </div>
                    <div className="budget-input">
                        <BudgetForm budget={this.handleInput} show={this.state.showInput}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Budget;