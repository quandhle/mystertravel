import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {change} from 'redux-form';

import './map.scss';
import SearchBar from './search_bar';

class Map extends Component{
    constructor(props){
        super(props);

        this.state = {
            lat: 41.8719,
            lng: 12.5674,
            api: '',
            pins: [],
            map: null
        }
    }

    componentDidMount(){
        this.getAccessToMap();
        this.getPins();
    }

    async getAccessToMap(){
        const resp = await axios.get('/api/getapikey.php?api=google');
        if(resp.data.success){
            this.setState({
                api: resp.data.data['api_key']
            });
            this.createMap();
        } else {
            console.error(resp.data.error);
        }
    }

    getPins = ()=> {
        const resp = axios.get('/api/getmappin.php').then((resp) => {
            this.setState({
                pins: resp.data.data
            })
        })
    }

    createMap = () => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.state.api}&libraries=places&callback=initMap`);
        window.initMap = this.initMap;
    }

    initMap = () => {
        const input = document.getElementById("places");
        this.autoComplete = new window.google.maps.places.Autocomplete(input, {
            types: ['(regions)']});
        this.autoComplete.setFields(['address_component', 'geometry', 'name']);
        this.autoComplete.addListener('place_changed', this.searchCountry);

        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: this.state.lat, lng: this.state.lng},
          zoom: 8
        });

        this.setState({
            map: map
        });

        // const allMarkers = this.state.pins.map((item) => {
        //     const position = {
        //         lat: parseFloat(item.lat),
        //         lng: parseFloat(item.lng)
        //     };
        //
        //     const marker = new window.google.maps.Marker({position: position, map: map})
        // });
        //
        // const position = {lat: 41.8, lng: 12.5};
        // const marker = new window.google.maps.Marker({position: position, map: map});
    }

    searchCountry = () => {

        const place = this.autoComplete.getPlace();
        console.log('Place:', place);

        let address;
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(', ');
        }

        this.props.dispatch(change("search-bar-form", `places`, address));

        this.state.map.setCenter(place.geometry.location);
        const marker = new google.maps.Marker({
            map: this.state.map,
            position: place.geometry.location
        });
        this.setState({
            pins: [...this.state.pins, marker]
        });
        console.log(this.state.pins);
    }

    getCurrentLocation= () => {
        navigator.geolocation.getCurrentPosition(this.savePosition);
        const crd = pos.coords;
        this.setState({lat: crd.latitude, lng: crd.longitude});
        this.state.map.setCenter({lat: this.state.lat, lng: this.state.lng});
    }

    search(values) {
        // console.log(values);
    }

    render() {
        return (
            <main>
                <div className="search-bar-holder">
                    <SearchBar search={this.search}/>
                </div>
                <div id="map" className='map'>
                </div>
                <button className='btn map-btn btn-danger btn-lg'>
                    <i className="fas fa-map-marker-alt"/>Add Pin</button>
                <button onClick={this.getCurrentLocation} className='btn geo-btn btn-lg'>
                    <i className="fas fa-location-arrow"/></button>
            </main>
        );
    }
}

function loadScript(url){
    const index = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index); //keep script in the very begining
}


export default connect()(Map);
