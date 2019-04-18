import React, {Component} from 'react';
import axios from 'axios';
import './map.scss';

class Map extends Component{
    constructor(props){
        super(props)

        this.state = {
            lat: 41.8719,
            lng: 12.5674,
            api: ''
        }

    }
    componentDidMount(){
        this.getAccessToMap();
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
                <button className='btn map-btn btn-danger btn-lg'>Add Pin</button>
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
