import React, {Component} from 'react';
import keys from '../../../../api_keys';
import {loadScript} from "../../../helper";
import axios from 'axios';

class SummaryMap extends Component {
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

        this.initMap = this.initMap.bind(this);
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
        const map = new window.google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 2,
            minZoom: 2,
            draggableCursor: 'auto',
            draggingCursor: 'move',
            restriction: {
                latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
            }
        });

        this.setState({map: map});
        this.showPins();
    }

    async showPins() {
        const resp = await axios.get(`/api/getmappin.php?token=${localStorage.getItem('token')}`);
        let pinData = null;

        if(resp.data.success) {

            pinData = resp.data.data;

            if(pinData.length > 0) {
                const pins = pinData.map((item) => {
                    const pin = new window.google.maps.Marker({
                        position: {
                            lat: item.lat,
                            lng: item.lng
                        },
                        title: item.name,
                        map: this.state.map
                    });

                    const content = `<h6 id="infoWindow">${item.description}</h6>`;

                    const infowindow = new google.maps.InfoWindow({
                        content: content
                    });

                    pin.addListener('click', function() {
                        infowindow.open(map, pin);
                    });

                    pin.setMap(this.state.map);

                    return pin;
                });
                this.setState({
                    pins: pins,
                });

                const lastPin = this.state.pins[this.state.pins.length - 1];
                this.state.map.setZoom(4);
                this.state.map.panTo(lastPin.position);
            }
        } else {
            console.error(resp.data.error);
        }

    }

    render() {
        return (
            <main>
                <h5 className="map-title">Map Pins <i className="fas fa-map-marked-alt"></i></h5>
                <div id="map" className='map'/>
            </main>
        );
    }
}

export default SummaryMap;
