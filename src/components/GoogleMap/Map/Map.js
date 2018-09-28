import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../../store/actions/actionTypes';
import style from "./Map.css";
import axios from '../../../axios';
import Aux from '../../../hocs/Auxiliary/Auxiliary';

class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
            center : null,
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

        // new MeasureTool(map, {
        //     showSegmentLength: true,
        //     tooltip: true
        // })

        this.props.onMapInit(map)
    }

    // latest loatmap function
    __loadMap(){
        console.log(this.props.networkID)
        axios.get('v1/network?network_id='
        +this.props.networkID
        ).then(response=>{
            this.props.map.setCenter({lat: response.data['Data']['latitude'], lng: response.data['Data']['longitude']});
            this.props.updateMap(this.props.map);
        }).catch(error => {
            console.log(error);
        });
    }


    componentDidMount(){//componentDidMount
        this.__init();   
        this.__loadMap();
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
        networkID: state.map.networkID,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMapInit: (map) => dispatch({type: actionsType.INIT_MAP, payload:{map: map}}),
        updateMap: (map) => dispatch({type: actionsType.UPDATE_HEATMAP, payload:{map: map}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);