import React, {Component} from 'react';
import axios from 'axios';
import {reduxForm, Field} from 'redux-form';
import Modal from '../general/modal';
import Input from '../general/input';


class StartTrip extends Component {
    constructor(props){
        super(props);

        this.state ={
            api: ''
        }
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
            this.props.history.push('/map');
        }
    }

    componentDidMount(){
        this.getAccessToMap()
    }

    async getAccessToMap(){
        const resp = await axios.get('/api/getapikey.php?api=google');
        if(resp.data.success){
            this.setState({
                api: resp.data.data['api_key']
            });
            this.createSearch()
        } else {
            console.error(resp.data.error);
        }

    }

    createSearch = ()=>{
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.state.api}&libraries=places&callback=initAutocomplete`);
        window.initAutocomplete = this.initAutocomplete;
    }

    initAutocomplete = ()=>{
        const input = document.getElementById("places");
        this.autoComplete = new window.google.maps.places.Autocomplete(input, {
            types: ['(regions)']});
        this.autoComplete.setFields(['address_component']);
        this.autoComplete.addListener('place_changed', this.searchCountry);
    }

    searchCountry = ()=>{
        const place = this.autoComplete.getPlace();
        console.log('Place:', place);
        this.props.change("places", place['address_components'][0]['long_name'])
    }

    render() {
        const {handleSubmit, modal, close} = this.props
        console.log(this.props);
        return (
                <Modal open={modal} childrenStyle="home-modal">
                    <div className="homepage-modal-header">Give your trip a name!</div>
                    <form onSubmit={handleSubmit(this.searchCountry)}>
                         <Field id="tripname" name="tripname" label="Trip name" component={Input} classes="start-input"/>
                         <Field id="places" name="places" label="Enter Places" component={Input} classes="start-input"/>
                    </form> 
                    <button onClick={close} className="btn start-trip-btn">GO</button>
                </Modal>
        )
    }
}

function loadScript(url){
    const index = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default reduxForm({
    form: 'start-new-trip'
})(StartTrip);