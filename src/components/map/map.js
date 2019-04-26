import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {change} from 'redux-form';

import './map.scss';
import keys from './../../../api_keys';
import SearchBar from './search_bar';
import MapPopUp from './map_popup';
import {loadScript} from "../../helper";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 1,  
            lng: 1,
            pins: [],
            name: null,
            map: null,
            modal: false
        };

        this.addPin = this.addPin.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.initMap = this.initMap.bind(this);
        this.searchCountry = this.searchCountry.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        if (!(window.google && window.google.maps)) {
            this.loadMapScript();
        } else {
            this.initMap();
        }
    }

    loadMapScript() {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${keys.googleMaps}&libraries=places&callback=initMap`);
        window.initMap = this.initMap;
    }

    initMap() {
        const searchBarInput = document.getElementById("places");
        this.autoComplete = new window.google.maps.places.Autocomplete(searchBarInput);
        this.autoComplete.setFields(['name', 'geometry']);

        this.autoComplete.addListener('place_changed', this.searchCountry);

        const map = new window.google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 2,
            minZoom: 2,
        });

        this.setState({map: map});
        this.showPins();
    }

    searchCountry() {
        const place = this.autoComplete.getPlace();

        if (place.name) {
            this.props.dispatch(change("search-bar-form", `places`, place.name));

            const {location: {lat, lng}} = place.geometry;
            this.state.map.setCenter(location);
            this.state.map.setZoom(14);

            this.setState({
                lat: lat(),
                lng: lng(),
                name: place.name
            });
        } else {
            const service = new google.maps.places.PlacesService(this.state.map);

            service.findPlaceFromQuery({
                    query: place.name,
                    fields: ['geometry', 'name']

            }, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.props.dispatch(change("search-bar-form", `places`, results[0].name));

                    this.state.map.setCenter(results[0].geometry.location);
                    this.state.map.setZoom(14);

                    this.setState({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                        name: results[0].name
                    })
                }
            });
        }

        setTimeout(this.toggleModal, 500);
    }

    async showPins() {
        const {trips_id} = this.props;
        const {map} = this.state;

        const resp = await axios.get(`/api/getmappin.php?trips_id=${trips_id}`);
        let pinData = null;
         
        if (resp.data.success) {
            pinData = resp.data.data;
        }

        if (pinData) {
            const pins = pinData.map((item) => {
                const pin = new window.google.maps.Marker({
                    position: {
                        lat: item.lat,
                        lng: item.lng
                    },
                    map: map
                });

                const content = `<h6 id="infoWindow">${item.description}</h6>`;

                const infowindow = new google.maps.InfoWindow({
                    content: content
                });

                pin.addListener('click', function() {
                    infowindow.open(map, pin);
                });

                pin.setMap(map);

                return pin;
            });
            this.setState({
                pins: pins
            });
        }
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            const {coords} = position;
            const coordObject = {lat: coords.latitude, lng: coords.longitude};
            this.setState(coordObject);

            this.state.map.setCenter(coordObject);
            this.state.map.setZoom(14);

            const geocoder = new google.maps.Geocoder;
            geocoder.geocode({'location': coordObject}, (results, status) => {
                if (status === 'OK' && results[0]) {
                    this.props.dispatch(change("search-bar-form", `places`,
                        results.length > 3 ?
                            results[results.length - 4].formatted_address : results[0].formatted_address));

                    this.setState({
                        name: results[0].formatted_address.split(" ")[0]
                    })
                }
            });
        });
    }

    handleClear(event) {
        event.preventDefault();
        this.props.dispatch(change("search-bar-form", `places`, ''));
        document.getElementById("places").focus();
    }

    addPin(value) {
        this.toggleModal();
        const {lat, lng, name} = this.state;

        const resp = axios.post('/api/addmappin.php', {
            trips_id: this.props.trips_id,
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            description: value['pin-description'],
            name: name
        }).then((resp) => {
            const marker = new window.google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng,
                },
                title: resp.data.name
            });

            this.setState({
                pins: [...this.state.pins, marker]
            });

            this.showPins();
        })
    }

    toggleModal(){
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {modal} = this.state;
        return (
            <main>
                <div className="search-bar-holder">
                    <SearchBar handleClear={this.handleClear}/>
                </div>
                <div id="map" className='map'/>
                <button className='btn map-btn btn-lg' onClick={this.addPin}>
                    Add Pin <i className="fas fa-map-marker-alt"/>
                </button>
                <button onClick={this.getCurrentLocation} className='btn geo-btn btn-lg'>
                    <i className="fas fa-location-arrow"/>
                </button>
                {modal && <MapPopUp modal={modal} close={this.toggleModal} addpin={this.addPin}/>}
            </main>
        );
    }
}

function mapStateToProps(state){
    return{
        trips_id: state.trips_id.trips_id
    }
}

export default connect(mapStateToProps)(Map);
