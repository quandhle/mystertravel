import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BudgetForm from './budget_form';
import BudgetItem from './budget_item';
import './budget.scss';


class Budget extends Component{
    constructor(props) {
        super(props)

        this.state = {
            showInput: {
                height: 0
            },
            budget: []
        }

        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.deleteBudgetItem = this.deleteBudgetItem.bind(this);
    }

    async handleInput(value) {
        console.log(value, trips_id)
        const {trips_id} = this.props.trips_id;
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
        const {trips_id} = this.props.trips_id;
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
    }
    async getBudgetList() {
        const {trips_id} = this.props.trips_id;
        const resp = await axios.get(`/api/getbudgetlist.php?trips_id=${trips_id}`);
        if (resp.data.success) {
            console.log(resp.data)
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
        let budgetList = null;
        console.log(budget)

        if(budget.length > 0){
            budgetList = budget.map(budgetItem => {
                return <BudgetItem key={budgetItem.budget_id} budgetItem={budgetItem} deleteBudgetItem={this.deleteBudgetItem}/>
            });
        }     
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

function mapStateToProps(state){
    return{
        trips_id: state.trips_id
    }
}

export default connect(mapStateToProps)(Budget);

