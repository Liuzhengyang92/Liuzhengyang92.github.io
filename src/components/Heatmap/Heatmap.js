import React, { Component } from 'react';
import {connect} from 'react-redux'

import * as actionsType from '../../store/actions/actionTypes'

import style from "./Heatmap.css"
import axios from '../../axios'

class Heatmap extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    __initMap(){
        let map = new window.google.maps.Map(document.getElementById('map'),{
            center: this.props.center,
            zoom: this.props.zoom,
            zoomControl: true,
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'roadmap',
        });

        let heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
            map: map
        })

        this.props.onHeatmapInit(map,heatmapLayer)
    }

    __loadData(){
        axios.get('/v1/device/listlive?network_id=326046&offset=0&limit=10000&interval=5')
            .then(response => {
                const devices = response.data['Data']["deviceList"];
                const mvc = devices.map(device => {
                    return new window.google.maps.LatLng(device.latitude, device.longitude)
                })
                this.props.heatmapLayer.setData(mvc)
                this.props.onHeatmapUpdateDevices(devices);
            }).catch(error => {
                console.log(error);
            });
    }

    componentDidMount(){
        this.__initMap();
        this.__loadData();
    }

    render () {
        return (
            <div>
                <div className={style.maps} id="map"></div>            
                <button onClick={() => this.props.onHeatMapUpdate()}>Test</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        map: state.heatmap.map,
        heatmapLayer: state.heatmap.heatmapLayer,
        zoom: state.heatmap.zoom,
        center: state.heatmap.center,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapInit: (map, heatmapLayer) => dispatch({type: actionsType.INIT_HEATMAP, payload:{map: map, heatmapLayer: heatmapLayer}}),
        onHeatmapUpdateDevices: (devices) => dispatch({type: actionsType.INIT_HEATMAP, payload:{devices: devices}}),
        onHeatmapUpdateAccessPoints: (accesspoints) => dispatch({type: actionsType.INIT_HEATMAP, payload:{accesspoints: accesspoints}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heatmap);