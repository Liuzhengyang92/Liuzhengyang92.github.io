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
        const map = new window.google.maps.Map(document.getElementById('map'),{
            center: this.props.center,
            zoom: this.props.zoom,
            zoomControl: true,
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'roadmap',
        });

        const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
            map: map
        })

        const drawingManager = new window.google.maps.drawing.DrawingManager({
            map: map,
            // drawingMode: window.google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon', 'polyline']
            },
            polygonOptions: {
                fillColor: '#37b5eb',
                fillOpacity: 0.3,
                strokeWeight: 3,
                strokeColor: '#1873e2',
                clickable: true,
                editable: true,
                zIndex: 1
              },
            polylineOptions: {
                strokeWeight: 3,
                strokeColor: '#fd2e2e',
                strokeOpacity: 0.7,
                clickable: true,
                editable: true,
                zIndex: 1
              },
          });

        this.props.onHeatmapInit(map,heatmapLayer,drawingManager)
    }

    __loadDevices(){
        axios.get('/v1/device/listlive?' 
            + 'network_id=' + this.props.networkID
            + '&offset=0'
            + '&limit=10000'
            + '&interval=' + this.props.apiDataInterval)
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

    __loadAccessPoints(){
        axios.get('/v1/accesspoint/list?' 
            + 'network_id=' + this.props.networkID
            + '&offset=0'
            + '&limit=100')
            .then(response => {
                let pinIcon = new window.google.maps.MarkerImage(
                    "https://2ak73i3q17c819roemwf35m1-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/cellular-icon-macro-small.png",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new window.google.maps.Size(40, 40)
                );
                const accesspoints = response.data["Data"]["accessPointList"].map(accesspoint => {
                    new window.google.maps.Marker({
                        icon:pinIcon,
                        position: {lat: accesspoint.latitude, lng:accesspoint.longitude},
                        map: this.props.map,
                    });
                    return {lat: accesspoint.latitude, lng:accesspoint.longitude}
                });
                this.props.onHeatmapUpdateAccessPoints(accesspoints);
            }).catch(error => {
                console.log(error);
            });
    }

    componentDidMount(){
        this.__initMap();
        this.__loadDevices();
        this.__loadAccessPoints();

        const timer = setInterval(()=>{
            // if heatmapLayer enable then load data
            if (this.props.heatmapLayer.getMap() !== null){
                this.__loadDevices()
            }
        }, 30000)
        this.setState({...this.state,timer: timer})
    }

    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    __heatmapDisplayHandler = () => {
        if (this.props.heatmapLayer.getMap() === null){
            this.props.heatmapLayer.setMap(this.props.map)
        } else {
            this.props.heatmapLayer.setMap(null)
        }
    }

    render () {
        return (
            <div>
                <div className={style.maps} id="map"></div>            
                <button onClick={() => this.props.onHeatMapUpdate()}>Test</button>
                <button onClick={() => this.__heatmapDisplayHandler()}>Hide/Show Heatmap</button>
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
        apiDataInterval: state.heatmap.apiDataInterval
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapInit: (map, heatmapLayer, drawingManager) => dispatch({type: actionsType.INIT_HEATMAP, payload:{map: map, heatmapLayer: heatmapLayer, drawingManager: drawingManager}}),
        onHeatmapUpdateDevices: (devices) => dispatch({type: actionsType.UPDATE_DEVICES_HEATMAP, payload:{devices: devices}}),
        onHeatmapUpdateAccessPoints: (accesspoints) => dispatch({type: actionsType.UPDATE_ACCESSPOINTS_HEATMAP, payload:{accesspoints: accesspoints}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heatmap);