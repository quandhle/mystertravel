import React, {Component} from 'react';
import './map.scss';
<<<<<<< HEAD
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
=======


class Map extends Component{
    constructor(props){
        super(props)

        this.state = {
            lat: 41.8719,
            lng: 12.5674,
            api: 'need to get api'
        }

    }
    componentDidMount(){
        this.createMap();
    }
    createMap = ()=>{
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.state.api}&callback=initMap`);
        window.initMap = this.initMap;
    }
    initMap= ()=> {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: this.state.lat, lng: this.state.lng},
          zoom: 8
        });

        const position = {lat: 41.8, lng: 12.5}
        const marker = new window.google.maps.Marker({position: position, map: map});
    }
    getLocation(){

    }
    render(){
        return (
            <main>
                <div id="map" className='map'>

                    
                </div>
                <button className='btn btn-danger btn-lg'>Add Pin</button>
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

export default Map;
>>>>>>> baa020dfb3591ffe9d95f757af30d91672537679
