import { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../../store/actions/actionTypes';
import axios from '../../../axios';

class HeatmapLayer extends Component {

    constructor(props){
        super(props);
        this.state = {
            timer: null,
        }
    }

    __init(){
        const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
            map: this.props.map
        })
        this.props.onHeatmapLayerInit(heatmapLayer)
    }

    __loadData(){
        this.__loadDevices();
        this.__loadAccessPoints();
    }

    __initAutoUpdate(){
        const timer = setInterval(()=>{
            if (this.props.heatmapLayer.getMap() !== null){
                this.__loadDevices()
            }
        }, 60000)
        this.setState({...this.state,timer: timer})
    }

    componentDidUpdate(prevProps){
        console.log(this.props.map)
        if(this.props.readyToInit & prevProps.map === null){
            this.__init()
            this.__loadData()
            this.__initAutoUpdate()
        }
    }

    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    render () {
        return (
            null
        )
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
                this.props.onHeatmapLayerLoadDeviceData(devices);
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
                this.props.onHeatmapLayerLoadAccessPointData(accesspoints);
            }).catch(error => {
                console.log(error);
            });
    }
}

const mapStateToProps = state => {
    return {
        map: state.map.map,      
        heatmapLayer: state.map.heatmapLayer,
        networkID: state.map.networkID,
        apiDataInterval: state.map.apiDataInterval
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapLayerInit: (heatmapLayer) => dispatch({type: actionsType.INIT_HEATMAPLAYER, payload:{heatmapLayer: heatmapLayer}}),
        onHeatmapLayerLoadDeviceData: (devices) => dispatch({type: actionsType.LOAD_HEATMAPLAYER_DEVICE_DATA, payload:{devices: devices}}),
        onHeatmapLayerLoadAccessPointData: (accesspoints) => dispatch({type: actionsType.LOAD_HEATMAPLAYER_ACCESSPOINT_DATA, payload:{accesspoints: accesspoints}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatmapLayer);