import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionsType from '../../store/actions/actionTypes'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class Heatmap extends Component {
    render () {
        const HOC = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={19}
                defaultCenter={{lat: -33.879944, lng:151.203373}}
                >
                {props.isMarkerShown && <Marker position={{lat: -33.879944, lng:151.203373}} />}
            </GoogleMap>
        ))

        return (
            <HOC 
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg6d8ijsi0gbStSF8lTYlWN3LI5iAS0LY&libraries=geometry,drawing,places,visualization"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} 
            />}></HOC>
        );
    }
}

// the state here is the global state
const mapStateToProps = state => {
    return {
        heatmapData: state.heatmap.heatmapData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapInit: () => dispatch({type: actionsType.INIT_HEATMAP}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heatmap);