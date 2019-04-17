import React, {Component} from 'react';
import './map.scss';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { isAbsolute } from 'path';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={13}
                style={
                    {
                        position: 'absolute',
                        width: '100%',
                        height: 'calc(100%-56px)'
                    }
                }
                initialCenter={
                    {lng: -117.765991,
                    lat: 33.6839473}
                }
            />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyeel_P_5U9HXS5zEfmEqUvRuegRdqyic'
})(MapContainer);