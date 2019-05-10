import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BudgetForm from './budget_form';
import BudgetItem from './budget_item';
import './budget.scss';
import Map from '../../map';
import SpinnerModal from "../../general/spinnerModal";
import {signIn} from '../../../actions';

class Budget extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showInput: {
                height: 0
            },
            budget: [],
            spinner: false,
            sortMode: 'date',
            sortDirection: {
                date: 'down',
                amount: 'down',
                category: 'down'
            },
            sortIconsStyle: {
                date: {'backgroundColor': '#fa8d62'},
                amount: {'backgroundColor': '#2b616d'},
                category: {'backgroundColor': '#2b616d'}
            },
        };

        this.sortTypes = {
            date: ['oldest', 'newest'],
            amount: ['expensive', 'cheapest'],
            category: ['category', 'z-a']
        };

        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.deleteBudgetItem = this.deleteBudgetItem.bind(this);
        this.getBudgetList = this.getBudgetList.bind(this);
    }

    async handleInput(value) {
        this.setState({
            spinner: true
        });

        const {trips_id} = this.props;

        const resp = await axios.post('/api/addbudgetitem.php', {
            trips_id,
            description: value.description,
            price: parseFloat(value.price * 100),
            category: value.category,
            token: localStorage.getItem('token')
        });

        if(resp.data.success) {
            value.description = '';
            value.price = '';
            value.category = '';
            this.getBudgetList();
            this.toggleInput();
            setTimeout(() => {
                this.setState({spinner: false});
            }, 350);
        } else {
            console.error('Unable to add entry');
        }
    }

    async deleteBudgetItem(budgetItem) {
        const {trips_id} = this.props.trips_id;

        const resp = await axios.put('/api/deletebudgetitem.php', {
            trips_id,
            budget_id: budgetItem.budget_id,
            token: localStorage.getItem('token')
        });

        if(resp.data.success) {
            this.getBudgetList();
        } else {
            console.error('Unable to delete entry');
        }
    }

    async getBudgetList() {
        const resp = await axios.get(`/api/getbudgetsort.php?token=${localStorage.getItem('token')}&type=time`);
        const {signIn} = this.props;
        const {budget, success} = resp.data;

        if(success) {
            signIn(resp.data);
            this.setState({
                budget
            });
        } else {
            console.error(resp.data.error);
        }
    }

    toggleInput() {
        const {height} = this.state.showInput;

        if(!height) {
            this.setState({
                showInput: {height: '300px'}
            });
        } else {
            this.setState({
                showInput: {height: 0}
            });
        }
    }

    async sortBudget(mode) {
        const {sortMode, sortDirection, sortIconsStyle} = this.state;
        const {sortTypes} = this;
        let type, newMode, swap;

        if (sortMode !== mode) {
            newMode = mode;
            type = sortDirection[mode] === 'down' ? sortTypes[mode][0] : sortTypes[mode][1];
        } else {
            type = sortDirection[mode] === 'down' ? sortTypes[mode][1] : sortTypes[mode][0];
            swap = true;
        }

        const resp = await axios.get(`/api/getbudgetsort.php?token=${localStorage.getItem('token')}&type=${type}`);
        const {success, budget, error} = resp.data;

        if (success) {
            sortDirection[mode] = swap ? (sortDirection[mode] === 'down' ? 'up' : 'down') : sortDirection[mode];

            sortIconsStyle['date'] = {'backgroundColor': '#2b616d'};
            sortIconsStyle['amount'] = {'backgroundColor': '#2b616d'};
            sortIconsStyle['category'] = {'backgroundColor': '#2b616d'};
            sortIconsStyle[mode] = {'backgroundColor': '#fa8d62'};

            this.setState({
                budget,
                sortMode: newMode ? newMode : sortMode,
                sortDirection: sortDirection,
                sortIconsStyle: sortIconsStyle
            });
        } else {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getBudgetList();
    }

    render() {
        const {budget, showInput, spinner, sortDirection, sortIconsStyle, sortMode} = this.state;
        let budgetList = null;

        if(budget.length > 0) {
            budgetList = budget.map(budgetItem => {
                return <BudgetItem key={budgetItem.budget_id} budgetItem={budgetItem} deleteBudgetItem={this.deleteBudgetItem} display={this.getBudgetList}/>
            });
        } else {
            budgetList = <div className="budget">Add expenses to record your trip <i className="far fa-laugh-wink"></i> </div>
        }

        return (
            <div className="budget-page">
                <SpinnerModal open={spinner}/>
                <div className="budget-section">
                    <div className="budget-input-toggle" onClick={this.toggleInput}>
                    Add Budget Item <i className="fas fa-angle-double-down"></i>
                    </div>
                    <BudgetForm budget={this.handleInput} style={showInput}/>
                    <div className="sort-budget">
                        <button className="sort-btn btn" style={sortIconsStyle.date} onClick={() => (this.sortBudget('date'))}>
                            <i className={'fas fa-clock'}></i>
                            <i className={`fas fa-sort-${sortDirection.date}`}></i>
                        </button>
                        <button className="sort-btn btn" style={sortIconsStyle.amount} onClick={() => (this.sortBudget('amount'))}>
                            <i className={'fas fa-dollar-sign'}></i>
                            <i className={`fas fa-sort-${sortDirection.amount}`}></i>
                        </button>
                        <button className="sort-btn btn" style={sortIconsStyle.category} onClick={() => (this.sortBudget('category'))}>
                            <i className={`fas fa-sort-alpha-${sortDirection.category}`}></i>
                        </button>
                    </div>
                    <div className="sort-title">
                        <span>Sort: {sortMode}</span>
                    </div>
                    <div className="budget-box">
                        {budgetList}
                    </div>
                </div>
                <Map/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        trips_id: state.user.trips_id
    };
}

export default connect(mapStateToProps, {
    signIn
})(Budget);
