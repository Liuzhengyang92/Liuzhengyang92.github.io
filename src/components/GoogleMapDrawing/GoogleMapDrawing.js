import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../store/actions/actionTypes';
// import style from "./Heatmap.css";
// import axios from '../../axios';

let drawingManager;
let selectedShape;
let colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
let selectedColor;
let colorButtons = {};


function clearSelection () {
    if (selectedShape) {
        if (selectedShape.type !== 'marker') {
            selectedShape.setEditable(false);
        }
        selectedShape = null;
    }
}

function setSelection (shape) {
    if (shape.type !== 'marker') {
        clearSelection();
        shape.setEditable(true);
        selectColor(shape.get('fillColor') || shape.get('strokeColor'));
    }
    selectedShape = shape;
}

function deleteSelectedShape () {
    if (selectedShape) {
        selectedShape.setMap(null);
    }
}

function selectColor (color) {
    selectedColor = color;
    for (let i = 0; i < colors.length; ++i) {
        let currColor = colors[i];
        colorButtons[currColor].style.border = currColor === color ? '2px solid #789' : '2px solid #fff';
    }

    let polylineOptions = drawingManager.get('polylineOptions');
    polylineOptions.strokeColor = color;
    drawingManager.set('polylineOptions', polylineOptions);

    let rectangleOptions = drawingManager.get('rectangleOptions');
    rectangleOptions.fillColor = color;
    drawingManager.set('rectangleOptions', rectangleOptions);

    let circleOptions = drawingManager.get('circleOptions');
    circleOptions.fillColor = color;
    drawingManager.set('circleOptions', circleOptions);

    let polygonOptions = drawingManager.get('polygonOptions');
    polygonOptions.fillColor = color;
    drawingManager.set('polygonOptions', polygonOptions);
}

// function setSelectedShapeColor (color) {
//     if (selectedShape) {
//         if (selectedShape.type === window.google.maps.drawing.OverlayType.POLYLINE) {
//             selectedShape.set('strokeColor', color);
//         } else {
//             selectedShape.set('fillColor', color);
//         }
//     }
// }
//
// function makeColorButton (color) {
//     let button = document.createElement('span');
//     button.class = document.getElementById('color-button');
//     button.style.backgroundColor = color;
//     window.google.maps.event.addListener(button, 'click', function () {
//         selectColor(color);
//         setSelectedShapeColor(color);
//     });

//     return button;
// }


class GoogleMapDrawing extends Component {

    constructor(props){
        super(props);
        this.state = {
            // timer: null,
        }
    }

    __init(){

        const polyOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            editable: true,
            draggable: true
        }

        drawingManager = new window.google.maps.drawing.DrawingManager({
            map: this.props.map,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
            },
            markerOptions: {
                draggable: true
            },

            polygonOptions: polyOptions,
              //   {
              //   fillColor: '#37b5eb',
              //   fillOpacity: 0.3,
              //   strokeWeight: 3,
              //   strokeColor: '#1873e2',
              //   clickable: true,
              //   draggable: true,
              //   editable: true,
              //   zIndex: 1
              // },
            polylineOptions: {
                strokeWeight: 3,
                strokeColor: '#fd2e2e',
                strokeOpacity: 0.7,
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1
              },
            rectangleOptions: polyOptions,
            circleOptions: polyOptions,
          });

        window.google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
            let newShape = e.overlay;

            newShape.type = e.type;

            if (e.type !== window.google.maps.drawing.OverlayType.MARKER) {
                drawingManager.setDrawingMode(null);
                window.google.maps.event.addListener(newShape, 'click', function(e){
                    if (e.vertex !== undefined) {
                        if (newShape.type === window.google.maps.drawing.OverlayType.POLYGON) {
                            let path = newShape.getPaths().getAt(e.path);
                            path.removeAt(e.vertex);
                            if (path.length < 3) {
                                newShape.setMap(null);
                            }
                        }

                        if (newShape.type === window.google.maps.drawing.OverlayType.POLYLINE) {
                            let path = newShape.getPath();
                            path.removeAt(e.vertex);
                            if (path.length < 2) {
                                newShape.setMap(null);
                            }
                        }
                    }
                    setSelection(newShape);
                });
                setSelection(newShape);

            }
            else {
                window.google.maps.event.addListener(newShape, 'click', function (e) {
                    setSelection(newShape);
                });
                setSelection(newShape);
            }
        });

        // buildColorPalette();
        this.props.onHeatmapInit(this.props.map,this.props.heatmapLayer,drawingManager)
    }

    componentDidMount(){
        this.__init();
        console.log(this.props.map)
    }

    render () {
        return (
            <div>
                <button onClick={() => deleteSelectedShape()}>Delete Selected Shape</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        map: state.map.map,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapInit: (map, heatmapLayer, drawingManager) => dispatch({type: actionsType.INIT_HEATMAP, payload:{map: map, heatmapLayer: heatmapLayer, drawingManager: drawingManager}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapDrawing);