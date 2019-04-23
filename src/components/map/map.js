import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {change} from 'redux-form';

import './map.scss';
import keys from './../../../api_keys';
import SearchBar from './search_bar';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 41.8719,   // Rome
            lng: 12.5674,
            pins: [],
            name: null,
            map: null
        }

        this.addPin = this.addPin.bind(this);
    }

    componentDidMount() {
        // if it isn't already loaded, load Google Maps API script, and then initialize the map
        if (!(window.google && window.google.maps)) {
            this.loadMapScript();
        } else {
            this.initMap();
        }
    }

    loadMapScript() {
        // loads the Google Maps API script
        // a callback function is given to the API, which is run when the script is ready to load the map
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${keys.googleMaps}&libraries=places&callback=initMap`);
        window.initMap = this.initMap;
    }

    initMap = () => {
        // the input element you want autocomplete on
        const searchBarInput = document.getElementById("places");
        this.autoComplete = new window.google.maps.places.Autocomplete(searchBarInput, {
            types: ['(regions)']
        });
        this.autoComplete.setFields(['address_component', 'geometry', 'name']);

        // if autocomplete input changes, run the event handler
        this.autoComplete.addListener('place_changed', this.searchCountry);

        // initialize the map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,      // hide some of the control buttons
            streetViewControl: false,
            fullscreenControl: false,
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 10,
            minZoom: 2,
        });

        // save the map in state and get/show pins
        this.setState({map: map});
        this.showPins();
    }

    parseAddressComponents (address_components) {

        let zipCodeOffset = 0;
        if (address_components[address_components.length - 1].types[0] === 'postal_code') {
            // if the last slot is a zip code, we'll have to offset the cases below by 1 to skip over the zip code
            zipCodeOffset++;
        }

        if (address_components[address_components.length - 1 - zipCodeOffset].short_name === 'US') {
            // if the location is in the US:
            switch(address_components.length) {

                case 3 + zipCodeOffset:
                case 2 + zipCodeOffset:
                    // if only state and country are present, return 'state', US
                    return `${address_components[address_components.length - 2 - zipCodeOffset].long_name}, United States`;

                case 1 + zipCodeOffset:
                    // if the search was just 'US'
                    return 'United States';

                default:
                    // otherwise, return 'city, state'
                    return `${address_components[0].short_name}, ${address_components[address_components.length - 2 - zipCodeOffset].short_name}`;
            }

        } else {
            // for non-US countries, append all available parts
            return address_components.map((item) => {
                return item.long_name;
            }).join(', ');
        }
    }

    searchCountry = () => {
        // grab the input from the searchbar (either selected autocomplete entry or user key input)
        const place = this.autoComplete.getPlace();

        let address, location;

        if (place.address_components) {
            // autocompleted Places will have a address_components and a geometry.location (coords)
            address = this.parseAddressComponents(place.address_components);
            location = place.geometry.location;

            // center the map on the result
            this.state.map.setCenter(location);
            this.state.map.setZoom(12);
        } else {
            // user key input is put into Place.name
            // use findPlaceFromQuery to find a suitable match
            const service = new google.maps.places.PlacesService(this.state.map);
            service.findPlaceFromQuery({
                    query: place.name,
                    fields: ['geometry', 'name']

            }, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // center the map on the result
                    this.state.map.setCenter(results[0].geometry.location);
                    this.state.map.setZoom(12);
                }
            });

            address = place.name;
        }

        // change the input field to have the new address result
        this.props.dispatch(change("search-bar-form", `places`, address));

        this.setState({
            lat: location.lat(),
            lng: location.lng(),
            name: place.name
        })
    }

    async showPins() {
        // hard coded trips id, grab this from redux later
        const trips_id = 1;

        // get the pin data from the server
        const resp = await axios.get(`/api/getmappin.php?trips_id=${trips_id}`);
        let pinData = null;
        if(resp.data.success) {
            pinData = resp.data.data;
        }

        // if there was data, turn the pin data into Marker objects
        if (pinData) {
            const pins = pinData.map((item) => {
                const pin = new window.google.maps.Marker({
                    position: {
                        lat: item.lat,
                        lng: item.lng
                    },
                    map: this.state.map
                });

                // display the markers
                pin.setMap(this.state.map);

                const infowindow = new google.maps.InfoWindow({
                    content: this.state.name
                })

                pin.addListener('click', function() {
                    infowindow.open(map, pin);
                })
                
                return pin;
            });
            // save all the Marker objects in state
            this.setState({
                pins: pins,
            });
        }
    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const {coords} = position;
            const coordObject = {lat: coords.latitude, lng: coords.longitude};
            this.setState(coordObject);
            this.state.map.setCenter(coordObject);

            // get address
            const geocoder = new google.maps.Geocoder;
            geocoder.geocode({'location': coordObject}, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        this.props.dispatch(change("search-bar-form", `places`,
                            results.length > 3 ?
                                results[results.length - 4].formatted_address : results[0].formatted_address));
                    }
                }
            });
        });
    }

    handleClear = event => {
        event.preventDefault();
        this.props.dispatch(change("search-bar-form", `places`, ''));
        document.getElementById("places").focus();
    }

    addPin() {
        const {lat, lng, name} = this.state;

        const resp = axios.post('/api/addmappin.php', {
            trips_id: 1,
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            description: 'This is Irvine.',
            name: name
        }).then((resp) => {
            const pin = new window.google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng,
                },
                title: resp.data.name
            });

            console.log('resp is: ', resp.data);

            this.setState({
                pin: [...this.state.pins, pin]
            })

            console.log('state is: ', this.state);
        })

        this.showPins();
    }

    render() {
        return (
            <main>
                <div className="search-bar-holder">
                    <SearchBar handleClear={this.handleClear}/>
                </div>
                <div id="map" className='map'/>
                    <button className='btn map-btn btn-lg' onClick={this.addPin}>
                        <i className="fas fa-map-marker-alt"/> Add Pin
                    </button>
                <button onClick={this.getCurrentLocation} className='btn geo-btn btn-lg'>
                    <i className="fas fa-location-arrow"/>
                </button>
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
    index.parentNode.insertBefore(script, index);
}

export default connect()(Map);
