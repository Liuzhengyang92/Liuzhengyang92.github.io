import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../../store/actions/actionTypes';
import style from "./Map.css";

import Aux from '../../../hocs/Auxiliary/Auxiliary'

class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    __init(){
        const map = new window.google.maps.Map(document.getElementById('map'),{
            center: this.props.center,
            zoom: this.props.zoom,
            zoomControl: true,
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'roadmap',
        });

        this.props.onMapInit(map)
    }

    componentDidMount(){
        this.__init();
    }

    render () {
        return (
            <Aux>
                <div className={style.maps} id="map" /> 
                {this.props.children}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        map: state.map.map,
        zoom: state.map.zoom,
        center: state.map.center,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMapInit: (map) => dispatch({type: actionsType.INIT_MAP, payload:{map: map}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);