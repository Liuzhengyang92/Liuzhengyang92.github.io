import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../store/actions/actionTypes';
import style from "./Heatmap.css";
import axios from '../../axios';

import GoogleMapDrawing from '../GoogleMapDrawing/GoogleMapDrawing'

// let drawingManager;
// let selectedShape;
// let colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
// let selectedColor;
// let colorButtons = {};
// let google = window.google;
//
// function buildColorPalette () {
// //    let colorPalette = document.getElementById('color-palette');
//     for (let i = 0; i < colors.length; ++i) {
//         let currColor = colors[i];
//         let colorButton = makeColorButton(currColor);
//         // colorPalette.appendChild(colorButton);
//         colorButtons[currColor] = colorButton;
//     }
//     selectColor(colors[0]);
// }

// function clearSelection () {
//     if (selectedShape) {
//         if (selectedShape.type !== 'marker') {
//             selectedShape.setEditable(false);
//         }
//         selectedShape = null;
//     }
// }

// function setSelection (shape) {
//     if (shape.type !== 'marker') {
//         clearSelection();
//         shape.setEditable(true);
//         selectColor(shape.get('fillColor') || shape.get('strokeColor'));
//     }
//     selectedShape = shape;
// }

// function deleteSelectedShape () {
//     if (selectedShape) {
// //        selectedShape.set(null);
//         selectedShape.setMap(null);
//     }
// }

// function selectColor (color) {
//     selectedColor = color;
//     for (let i = 0; i < colors.length; ++i) {
//         let currColor = colors[i];
//         colorButtons[currColor].style.border = currColor === color ? '2px solid #789' : '2px solid #fff';
//     }

//     let polylineOptions = drawingManager.get('polylineOptions');
//     polylineOptions.strokeColor = color;
//     drawingManager.set('polylineOptions', polylineOptions);

//     let rectangleOptions = drawingManager.get('rectangleOptions');
//     rectangleOptions.fillColor = color;
//     drawingManager.set('rectangleOptions', rectangleOptions);

//     let circleOptions = drawingManager.get('circleOptions');
//     circleOptions.fillColor = color;
//     drawingManager.set('circleOptions', circleOptions);

//     let polygonOptions = drawingManager.get('polygonOptions');
//     polygonOptions.fillColor = color;
//     drawingManager.set('polygonOptions', polygonOptions);
// }

// function setSelectedShapeColor (color) {
//     if (selectedShape) {
//         if (selectedShape.type === google.maps.drawing.OverlayType.POLYLINE) {
//             selectedShape.set('strokeColor', color);
//         } else {
//             selectedShape.set('fillColor', color);
//         }
//     }
// }
// //
// function makeColorButton (color) {
//     let button = document.createElement('span');
//     button.class = document.getElementById('color-button');
//     button.style.backgroundColor = color;
//     google.maps.event.addListener(button, 'click', function () {
//         selectColor(color);
//         setSelectedShapeColor(color);
//     });

//     return button;
// }


class Heatmap extends Component {

    constructor(props){
        super(props);
        this.state = {
            timer: null,
        }
    }

    __initMap(){
       // buildColorPalette();
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

        //set polyOptions  added on 19/09
        // const polyOptions = {
        //     strokeWeight: 0,
        //     fillOpacity: 0.45,
        //     editable: true,
        //     draggable: true
        // }


        // drawingManager = new window.google.maps.drawing.DrawingManager({
        //     map: map,
        //     drawingControlOptions: {
        //         position: window.google.maps.ControlPosition.TOP_CENTER,
        //     },
        //     markerOptions: {
        //         draggable: true
        //     },

        //     polygonOptions: polyOptions,
        //       //   {
        //       //   fillColor: '#37b5eb',
        //       //   fillOpacity: 0.3,
        //       //   strokeWeight: 3,
        //       //   strokeColor: '#1873e2',
        //       //   clickable: true,
        //       //   draggable: true,
        //       //   editable: true,
        //       //   zIndex: 1
        //       // },
        //     polylineOptions: {
        //         strokeWeight: 3,
        //         strokeColor: '#fd2e2e',
        //         strokeOpacity: 0.7,
        //         clickable: true,
        //         draggable: true,
        //         editable: true,
        //         zIndex: 1
        //       },
        //     rectangleOptions: polyOptions,
        //     circleOptions: polyOptions,
        //   });

        // google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
        //     let newShape = e.overlay;

        //     newShape.type = e.type;

        //     if (e.type !== google.maps.drawing.OverlayType.MARKER) {
        //         drawingManager.setDrawingMode(null);
        //         google.maps.event.addListener(newShape, 'click', function(e){
        //             if (e.vertex !== undefined) {
        //                 if (newShape.type === google.maps.drawing.OverlayType.POLYGON) {
        //                     let path = newShape.getPaths().getAt(e.path);
        //                     path.removeAt(e.vertex);
        //                     if (path.length < 3) {
        //                         newShape.setMap(null);
        //                     }
        //                 }

        //                 if (newShape.type === google.maps.drawing.OverlayType.POLYLINE) {
        //                     let path = newShape.getPath();
        //                     path.removeAt(e.vertex);
        //                     if (path.length < 2) {
        //                         newShape.setMap(null);
        //                     }
        //                 }
        //             }
        //             setSelection(newShape);
        //         });
        //         setSelection(newShape);

        //     }
        //     else {
        //         google.maps.event.addListener(newShape, 'click', function (e) {
        //             setSelection(newShape);
        //         });
        //         setSelection(newShape);
        //     }
        // });

        // buildColorPalette();
        this.props.onHeatmapInit(map,heatmapLayer,null)
        // this.props.onHeatmapInit(map,heatmapLayer,drawingManager)

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
                {/* <label>Please Select Color: </label> */}
                {/* <div>
                    <button onClick={() => selectColor("#1E90FF") }>Blue</button>
                    <button onClick={() => selectColor("#FF1493") }>Pink</button>
                    <button onClick={() => selectColor("#32CD32") }>Green</button>
                    <button onClick={() => selectColor("#FF8C00") }>Orange</button>
                    <button onClick={() => selectColor("#4B0082") }>Purple</button>
                </div> */}
                <div>
                    <button onClick={() => this.props.onHeatMapUpdate()}>Test</button>
                    <button onClick={() => this.__heatmapDisplayHandler()}>Hide/Show Heatmap</button>
                    {/* <button onClick={() => deleteSelectedShape()}>Delete Selected Shape</button> */}
                </div>
                <GoogleMapDrawing />
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        // map: state.heatmap.map,
        // heatmapLayer: state.heatmap.heatmapLayer,
        // zoom: state.heatmap.zoom,
        // center: state.heatmap.center,
        // networkID: state.heatmap.networkID,
        // apiDataInterval: state.heatmap.apiDataInterval
        map: state.map.map,
        heatmapLayer: state.map.heatmapLayer,
        zoom: state.map.zoom,
        center: state.map.center,
        networkID: state.map.networkID,
        apiDataInterval: state.map.apiDataInterval
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