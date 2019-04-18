import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import Modal from './general/modal';
import Input from './general/input';

import coconut from './../assets/images/coconut.png';

class Home extends Component {
    constructor(props){
        super(props)

        this.state ={
            modal: true
        }
    }
    goToTrip = () => {
        this.props.history.push(`/mytrip`);
    }
    openModal= () =>{
        if(!this.state.modal){
            this.setState({
                modal: true
            })
        } else {
            this.setState({
                modal: false
            })
        }
    }

    searchCountry = (value)=>{
        console.log(value)
    }
    render() {
        const {handleSubmit} = this.props
        return (
            <div className="home-page">
                <div className="title-holder">
                    <h4 className='title-blurb'>Travelling? Log your adventure and keep track of where you've been!</h4>
                </div>
                <div className="img-wrap">
                    <img src={coconut} alt=""/>
                </div>
                <div className="home-page-btn">
                    <button onClick={this.openModal} className="home-start-btn btn btn-primary">Start / View trip</button>
                </div>

                <Modal open={this.state.modal} childrenStyle="home-modal">
                    <div className="homepage-modal-header">Where are you going? </div>
                    <form onSubmit={handleSubmit(this.searchCountry)}>
                         <Field id="places" name="places" label="Enter Places" component={Input}/>
                    </form>
                   
                </Modal>
            </div>
        )
    }
}

export default reduxForm({
    form: 'start-new-trip'
})(Home);