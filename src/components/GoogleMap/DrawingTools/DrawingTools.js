import { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../../store/actions/actionTypes';

let selectedShape = null;

function deleteSelectedShape () {
    if (selectedShape) {
        
        selectedShape.set(null);
        selectedShape.setMap(null);
    }
}

function setSelectedShape(shape) {
    if (shape.type !== 'marker') {
        clearSelectedShape();
        shape.setEditable(true);
    }
    selectedShape = shape;
};

function clearSelectedShape() {
    if (selectedShape) {
        if (selectedShape.type !== 'marker') {
            selectedShape.setEditable(false);
        }
        selectedShape = null;
    }
}

class DrawingTools extends Component {

    constructor(props){
        super(props);
        this.state = {
            polygonOptions: {
                strokeWeight: 3,
                fillColor: '#F01B2D',
                fillOpacity: 0.7,
                strokeColor: '#F01B2D',
                clickable: true,
                draggable: true,
                editable: false,
                zIndex: 1               
            },
            polylineOptions: {
                strokeWeight: 3,
                strokeColor: '#F01B2D',
                strokeOpacity: 0.7,
                clickable: true,
                draggable: true,
                editable: false,
                removeable: true,
                zIndex: 1
              },
        }
    }

    __init(){
        const drawingManager = new window.google.maps.drawing.DrawingManager({
            map: this.props.map,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon', 'polyline']
            },
            polygonOptions: this.state.polygonOptions,
            polylineOptions: this.state.polylineOptions,
          });

        window.google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
            let newShape = e.overlay;
            newShape.type = e.type;

            if (e.type !== window.google.maps.drawing.OverlayType.MARKER) {

                window.google.maps.event.addListener(newShape, 'click', function(e){
                    setSelectedShape(newShape);
                });

                window.google.maps.event.addDomListener(document, 'keyup', function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);

                    // Delete selected shape when press 'DELETE'
                    if (code === 46) {
                        console.log('[DELETE] SHAPE')
                        deleteSelectedShape()
                    }
                });
                // Clear selection after draw a new shape
                clearSelectedShape(newShape);
            }
        });

        this.props.onDrawingToolsInit(drawingManager)
    }

    componentDidUpdate(prevProps){
        if(this.props.readyToInit & prevProps.map === null){
            this.__init()
        }
    }

    render () {
        return (
            null
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
        onDrawingToolsInit: (drawingManager) => dispatch({type: actionsType.INIT_DRAWINGTOOLS, payload:{drawingManager: drawingManager}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawingTools);