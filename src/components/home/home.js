import React, {Component} from 'react';
import axios from 'axios';
import {reduxForm, Field} from 'redux-form';
import Modal from '../general/modal';
import Input from '../general/input';
import './home.scss';

import coconut from '../../assets/images/coconut.png';

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            modal: false,
            api: ''
        }

        this.autoComplete;
    }
    goToTrip = () => {
        this.props.history.push(`/mytrip`);
    }

    openModal = () =>{
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
        this.props.change("places", place['address_components'][0]['long_name'])
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
                    <button onClick={()=>{this.openModal(); this.createSearch()}} className="home-start-btn btn btn-primary">Start / View trip</button>
                </div>
                <div className="pretrip">
                </div>
                <div className="current"></div>
                <div className="posttrip"></div>

                <Modal open={this.state.modal} childrenStyle="home-modal">
                    <div className="homepage-modal-header">Where are you going? </div>
                    <form onSubmit={handleSubmit(this.searchCountry)}>
                         <Field id="places" name="places" label="Enter Places" component={Input}/>
                    </form> 
                    <button onClick={this.openModal}>GO</button>
                </Modal>
            </div>
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
})(Home);