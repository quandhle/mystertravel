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
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 10,
            minZoom: 2,
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

        let address, location;
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(', ');
            location = place.geometry.location;
        } else {
            const service = new google.maps.places.PlacesService(this.state.map);

            const map = this.state.map;

            service.findPlaceFromQuery({
                    query: place.name,
                    fields: ['geometry', 'name']
                }, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(12);
                }
            });

            address = place.name;

        }
        console.log('Address:', address);

        this.props.dispatch(change("search-bar-form", `places`, address));

        this.state.map.setCenter(location);
        this.state.map.setZoom(12);
    }

    getCurrentLocation= () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            this.setState({lat: crd.latitude, lng: crd.longitude});
            this.state.map.setCenter({lat: this.state.lat, lng: this.state.lng});
        });
    }

    handleClear = event => {
        event.preventDefault();
        console.log('got');
        this.props.dispatch(change("search-bar-form", `places`, ''));
        document.getElementById("places").focus();
    }

    render() {
        return (
            <main>
                <div className="search-bar-holder">
                    <SearchBar handleClear={this.handleClear}/>
                </div>
                <div id="map" className='map'>
                </div>
                <button className='btn map-btn btn-lg'>
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
