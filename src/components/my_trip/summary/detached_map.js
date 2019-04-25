import React, {Component} from 'react';

import keys from '../../../../api_keys';
import {loadScript} from "../../../helper";

export default class SummaryMap extends Component {
    state = {
        map: null,
        style: {
            position: 'fixed'
        }
    }

    componentDidMount() {
        if (!(window.google && window.google.maps)) {
            loadScript(`https://maps.googleapis.com/maps/api/js?key=${keys.googleMaps}&libraries=places&callback=initSummaryMap`);
            window.initSummaryMap = this.initSummaryMap;
        } else {
            this.initSummaryMap();
        }
    }

    initSummaryMap = () => {
        const map = new window.google.maps.Map(document.getElementById('summary-map'), {
            mapTypeControl: false,
            streetViewControl: false,
            center: {lat: 0, lng: 0},
            zoom: 2,
            minZoom: 2,
        });

        this.setState({map: map});
    }

    showPins() {
        const pins = pinData.map((item) => {
            const pin = new window.google.maps.Marker({
                position: {
                    lat: item.lat,
                    lng: item.lng
                },
                map: this.state.map,
                pin_id: item.pin_id
            });

            const content = ('<h6 id="infoWindow">' + item.description + '</h6>');

            const infowindow = new google.maps.InfoWindow({
                content: content
            })

            pin.addListener('click', function() {
                infowindow.open(map, pin);
            })

            pin.setMap(this.state.map);

            return pin;
        });
        // this.setState({
        //     pins: pins,
        // });
    }

    render() {
        console.log(this.props);
        return (
            <div className="summary-map-holder">
                <div id="summary-map" className='summary-map' style={this.state.style}/>
            </div>
        )
    }
}