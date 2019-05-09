import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import './map.scss';
import keys from './../../../api_keys';
import SearchBar from './search_bar';
import MapPopUp from './map_popup';
import {loadScript} from "../../helper";
import { signIn } from '../../actions';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 1,
            lng: 1,
            pins: [],
            name: null,
            map: null,
            modal: false,
            pinId: null,
            deleteBtn: false,
            infowindow: null
        };

        this.addPin = this.addPin.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.initMap = this.initMap.bind(this);
        this.searchCountry = this.searchCountry.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.deletePin = this.deletePin.bind(this);
        this.getPinId = this.getPinId.bind(this);
    }

    componentDidMount() {
        if(!(window.google && window.google.maps)) {
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
        this.autoComplete.setFields(['address_component', 'geometry', 'name']);

        this.autoComplete.addListener('place_changed', this.searchCountry);

        const map = new window.google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 2,
            minZoom: 2,
            draggableCursor: 'url(/dist/assets/images/marker.png), auto',
            draggingCursor: 'move'
        });

        window.google.maps.event.addListener(map, 'click', e => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            this.handleMapClick(lat, lng);
        });

        this.setState({map: map});
        this.showPins();
    }

    handleMapClick(lat, lng) {
        if(this.state.infowindow){
            this.state.infowindow.close();
        }

        const geocoder = new google.maps.Geocoder;

        geocoder.geocode({'location': {lat, lng}}, (results, status) => {
            if(status === 'OK') {
                const name = this.parseGeolocation(results[0].address_components);
                this.props.dispatch(change("search-bar-form", `places`, name));
                this.setState({
                    lat,
                    lng,
                    name,
                    deleteBtn: false
                });

                this.toggleModal();
            }
        });
    }

    searchCountry() {
        const place = this.autoComplete.getPlace();
        let address, location;

        if(place.address_components) {
            address = place.name;
            location = place.geometry.location;

            this.state.map.setCenter(location);
            this.state.map.setZoom(14);
        } else {
            const service = new google.maps.places.PlacesService(this.state.map);
            service.findPlaceFromQuery({
                query: place.name,
                fields: ['geometry', 'name']

            }, (results, status) => {
                if(status === google.maps.places.PlacesServiceStatus.OK) {
                    this.state.map.setCenter(results[0].geometry.location);
                    this.state.map.setZoom(14);
                }
            });

            address = place.name;
        }

        this.props.dispatch(change("search-bar-form", `places`, address));

        this.setState({
            lat: location.lat(),
            lng: location.lng(),
            name: place.name
        });

        setTimeout(this.toggleModal, 1000);
    }

    async deletePin() {
console.log('state pin id',this.state.pinId)
        const resp = await axios.post('/api/deletemappin.php', {
            pin_id: this.state.pinId
        });
console.log('resp', resp)
        if(resp.data.success) {
            this.showPins();
        } else {
            console.error(resp.data.error);
        }
        this.setState({
            deleteBtn: false
        });
    }

    getPinId(id) {
        console.log('pin id',id)
        this.setState({
            pinId: id,
            deleteBtn: true
        });
    }

    async showPins() {
        const resp = await axios.get(`/api/getmappin.php?token=${localStorage.getItem('token')}`);
        let pinData = null;

        if(resp.data.success) {
            this.props.signIn(resp.data);

            pinData = resp.data.data;
            let pins = null;
            let infowindow = null;
            if(pinData.length > 0) {

                pins = pinData.map((item) => {
                    const pin = new window.google.maps.Marker({
                        position: {
                            lat: item.lat,
                            lng: item.lng
                        },
                        title: item.name,
                        map: this.state.map,
                        pinId: item.pin_id
                    });

                    const content = '<h6 id="infoWindow">' + item.description + '</h6>';

                    infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    pin.addListener('click', () => {
                        this.getPinId(pin.pinId);
                    });

                    pin.addListener('click', function() {
                        infowindow.open(map, pin);
                    });

                    pin.setMap(this.state.map);

                    return pin;
                });

                this.setState({
                    pins: pins,
                    infowindow: infowindow
                });

                const lastPin = this.state.pins[this.state.pins.length - 1];
                this.state.map.setZoom(11);
                this.state.map.panTo(lastPin.position);
            } else {
                this.setState({
                    pins: pinData
                });
            }
        } else {
            console.error(resp.data.error);
        }

    }

    getCurrentLocation() {
        const success = position => {
            const {coords} = position;
            const coordObject = {lat: coords.latitude, lng: coords.longitude};

            this.setState(coordObject);
            this.state.map.setCenter(coordObject);
            this.state.map.setZoom(14);

            const geocoder = new google.maps.Geocoder;

            geocoder.geocode({'location': coordObject}, (results, status) => {
                if(status === 'OK' && results[0]) {
                    const name = this.parseGeolocation(results[0].address_components);
                    this.props.dispatch(change("search-bar-form", `places`, name));
                }
            });
        }

        const error = err => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        const options = {
            enableHighAccuracy: false
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    parseGeolocation(components) {
        let neighborhood, locality, aal1, aal2, aal3, country, component;

        for (let index = components.length - 1; index >= 0; index--) {
            component = components[index];

            switch (component.types[0]) {
                case 'country':
                    country = component.short_name === 'US' ? null : component.long_name;
                    break;
                case 'administrative_area_level_1':
                    aal1 = country === 'US' ? component.short_name : component.long_name;
                    break;
                case 'administrative_area_level_2':
                    aal2 = component.short_name;
                    break;
                case 'administrative_area_level_3':
                    aal3 = component.short_name;
                    break;
                case 'locality':
                    locality = component.long_name;
                    break;
                case 'neighborhood':
                    neighborhood = component.long_name;
                    break;
            }
        }

        locality = neighborhood ? neighborhood :
            (locality ? locality :
                (aal3 ? aal3 :
                    (aal2 ? aal2 :null)));

        aal1 = locality ? null : aal1;

        return [locality, aal1, country].filter(Boolean).join(", ");
    }

    handleClear(event) {
        event.preventDefault();

        this.props.dispatch(change("search-bar-form", `places`, ''));

        document.getElementById("places").focus();
    }

    async addPin(value) {
        this.toggleModal();

        const {lat, lng, name} = this.state;

        const resp = await axios.post('/api/addmappin.php', {
            trips_id: this.props.trips_id,
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            description: value['pin_description'],
            name: name,
            token: localStorage.getItem('token')
        });

        if(resp.data.success) {
            this.showPins();
        } else {
            console.error(resp.data.error);
        }
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {modal, deleteBtn} = this.state;

        return (
            <main>
                <div className="search-bar-holder">
                    <SearchBar handleClear={this.handleClear}/>
                </div>
                <div id="map" className='map'/>
                <button onClick={this.getCurrentLocation} className='btn geo-btn btn-lg'>
                    <i className="fas fa-location-arrow"/>
                </button>
                {deleteBtn? <button onClick={this.deletePin} className="btn delete-pin btn-lg">
                    Delete Pin <i className="fas fa-trash" aria-hidden="true"></i>
                </button>: null}
                {this.state.modal && <MapPopUp modal={modal} close={this.toggleModal} addpin={this.addPin}/>}
            </main>
        );
    }
}

function mapStateToProps(state){
    return {
        trips_id: state.user.trips_id
    };
}

function mapDispatchToProps(dispatch){
    return {
        signIn: (user) => {
            dispatch(signIn(user));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
