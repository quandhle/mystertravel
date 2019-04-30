import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {formatMoney} from '../../../helper';
import axios from 'axios';
import Input from '../../general/input';
import Modal from '../../general/modal';

class UpdateBudget extends Component{
    constructor(props){
        super(props)

        this.updatedb = this.updatedb.bind(this);
    }
    async updatedb(value){ 
        const {trips_id, budget, display, close} = this.props
        const resp = await axios.post('/api/updatebudget.php', {
            id: budget.budget_id,
            description: value.description,
            price: value.price * 100,
            category: value.category,
            trips_id
        }); 

        if(resp.data.success){
            display();
        }
        
        close();
    }
    render(){
        const {modal, close, handleSubmit} = this.props;
        return(
            <Modal open={modal} childrenStyle="update-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <div className="map-modal-header">Edit Budget?</div>
                <form onSubmit={handleSubmit(this.updatedb)}>
                    <Field id="description" name="description" label="Description" component={Input} classes="budget-input"/>
                    <Field id="price" name="price" label="Amount" component={Input} classes="budget-input"/>
                    <Field id="category" name="category" label="Category" component={Input} classes="budget-input"/>
                </form>
                <button className="btn updatebutton" onClick={handleSubmit(this.updatedb)} >Update</button>
            </Modal>  
        )
    }
}

function mapStateToProps(state, props){

    const { modal, budget } = props;
    return {
        initialValues: {
            description: modal ? budget.description : '',
            price: modal ? formatMoney(budget.price) : '',
            category: modal ? budget.category : '',
        },
        trips_id: state.trips_id.trips_id,
    }
}

function validate({description, price, category}){
    const errors = {};
    if(!description){
        errors.description = 'Please enter description';
    }
    if(!price){
        errors.price = 'Please enter a number'; 
    }
    if(!category){
        errors.category = 'Please enter category'; 
    }
    return errors;
}

UpdateBudget = reduxForm({
    form: 'initializeFromState-budget',
    enableReinitialize: true,
    validate
  })(UpdateBudget)
  
  
UpdateBudget = connect( mapStateToProps)(UpdateBudget)
  
export default UpdateBudget;