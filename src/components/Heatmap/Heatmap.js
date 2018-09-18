/* global google */
import React, { Component } from 'react';
import {connect} from 'react-redux'

import * as actionsType from '../../store/actions/actionTypes'

import style from "./Heatmap.css"

let map;

class Heatmap extends Component {

    constructor(props){
        super(props);
        this.state = {
            // zoom: 19
        }
    }

    componentDidMount(){
        this._initMap()
    }

    _initMap () {
        map = new window.google.maps.Map(document.getElementById('map'),{
          center: this.props.center,
          zoom: this.props.zoom,
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER
          },
          scrollwheel: false,
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: 'roadmap',
        });
      }

    render () {
        return (
            <div>
                <div className={style.maps} id="map"></div>            
                <button onClick={() => this.props.onHeatMapInit()}>Test</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        zoom: state.heatmap.zoom,
        center: state.heatmap.center,
        heatmapRawData: state.heatmap.heatmapRawData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatMapInit: () => dispatch({type: actionsType.INIT_HEATMAP}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heatmap);




    // render () {
    //     const HOC = withScriptjs(withGoogleMap((props) =>
    //         <GoogleMap
    //             defaultZoom={this.props.zoom}
    //             defaultCenter={this.props.center}
    //             >
    //             {props.isMarkerShown && <Marker position={this.props.center} />}
    //             <HeatmapLayer
    //                data={this.props.heatmapData}
    //                options={{radius: 20}} 
    //             />
    //             <button onClick={() => this.props.onHeatmapInit()}>Test</button>
    //         </GoogleMap>
    //     ))

    //     return (
    //         <HOC 
    //             isMarkerShown
    //             googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg6d8ijsi0gbStSF8lTYlWN3LI5iAS0LY&libraries=geometry,drawing,places,visualization"
    //             loadingElement={<div style={{ height: `100%` }} />}
    //             containerElement={<div style={{ height: `600px` }} />}
    //             mapElement={<div style={{ height: `100%` }} 
    //         />}></HOC>
    //     );
    // }