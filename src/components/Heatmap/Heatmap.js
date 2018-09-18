import React, { Component } from 'react';
import {connect} from 'react-redux'

import * as actionsType from '../../store/actions/actionTypes'

import style from "./Heatmap.css"
import axios from '../../axios'

class Heatmap extends Component {

    constructor(props){
        super(props);
        this.state = {
            timer: null,
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
        axios.get('/v1/device/listlive?' 
            + 'network_id=' + this.props.networkID
            + '&offset=0'
            + '&limit=10000'
            + '&interval=' + this.props.dataInterval)
            .then(response => {
                const devices = response.data['Data']["deviceList"];
                const mvc = devices.map(device => {
                    return new window.google.maps.LatLng(device.latitude, device.longitude)
                })
                this.props.heatmapLayer.setData(mvc);
                this.props.onHeatmapUpdateDevices(devices);
                console.log(devices)
            }).catch(error => {
                console.log(error);
            });
    }

    componentDidMount(){
        this.__initMap();
        this.__loadData();

        const timer = setInterval(()=>{this.__loadData()}, 30000)
        this.setState({...this.state,timer: timer})
    }

    componentWillUnmount(){
        clearInterval(this.state.timer);
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
        networkID: state.heatmap.networkID,
        dataInterval: state.heatmap.dataInterval
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapInit: (map, heatmapLayer) => dispatch({type: actionsType.INIT_HEATMAP, payload:{map: map, heatmapLayer: heatmapLayer}}),
        onHeatmapUpdateDevices: (devices) => dispatch({type: actionsType.UPDATE_DEVICES_HEATMAP, payload:{devices: devices}}),
        onHeatmapUpdateAccessPoints: (accesspoints) => dispatch({type: actionsType.UPDATE_ACCESSPOINTS_HEATMAP, payload:{accesspoints: accesspoints}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heatmap);