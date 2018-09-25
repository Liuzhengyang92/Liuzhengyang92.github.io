import { Component } from 'react';
import {connect} from 'react-redux';
import * as actionsType from '../../../store/actions/actionTypes';
let google = window.google;

class EntryZone extends Component {
    // constructor(props){
    //     super(props);
    // }

    _init() {
        const zoneZeroCoordinates = [
            { lat: -33.879628, lng: 151.204443 },
            { lat: -33.880200, lng: 151.204013 },
            { lat: -33.880240, lng: 151.204403 },
            { lat: -33.879628, lng: 151.204803 }
        ];

        const zoneOneCoordinates = [
            { lat: -33.880258, lng: 151.203903 },
            { lat: -33.880638, lng: 151.202983 },
            { lat: -33.880644, lng: 151.203573 },
            { lat: -33.880300, lng: 151.204373 },

        ];

        const zoneTwoCoordinates = [
            { lat: -33.879318, lng: 151.202003 },
            { lat: -33.880638, lng: 151.202503 },
            { lat: -33.880638, lng: 151.202883 },
            { lat: -33.879358, lng: 151.202373 },

        ];

        const zoneThreeCoordinates = [
            { lat: -33.879068, lng: 151.202003 },
            { lat: -33.879298, lng: 151.202013 },
            { lat: -33.879600, lng: 151.204443 },
            { lat: -33.879388, lng: 151.204443 }, 

        ];

        const zoneZeroPath = new google.maps.Polygon({
            path: zoneZeroCoordinates,
            geodesic: false,
            strokeColor: '#EE0000',
            strokeOpacity: 1.0,
            strokeWeight: 0,
            fillColor: '#00ced1',
            draggable: false
        });

        const zoneOnePath = new google.maps.Polygon({
            path: zoneOneCoordinates,
            geodesic: true,
            strokeColor: '#fd2e2e',
            strokeOpacity: 1.0,
            strokeWeight: 0,
            fillColor: '#fd2e2e'
        });

        const zoneTwoPath = new google.maps.Polygon({
            path: zoneTwoCoordinates,
            geodesic: true,
            strokeColor: '',
            strokeWeight: 0,
            fillColor: '#daa520'
        });

        const zoneThreePath = new google.maps.Polygon({
            path: zoneThreeCoordinates,
            geodesic: true,
            strokeColor: '',
            strokeWeight: 0,
            fillColor: '#191970'
        });
        
        zoneOnePath.setMap(this.props.map);
        zoneZeroPath.setMap(this.props.map);
        zoneTwoPath.setMap(this.props.map);
        zoneThreePath.setMap(this.props.map);
        console.log(this.props.map);
    }

    componentDidUpdate(prevProps){
        if(this.props.readyToInit & prevProps.map === null){
            this._init()
        }
    }

    render () {
        return(
            null
        )
    }
}

const mapStateToProps = state => {
    return {
        map: state.map.map,
    };
};

// const mapDispatchToProps = disptach => {
//     return {
//         onEntryZoneInit: (entryZone) => dispatch({type: actionsType.INIT_ENTRYZONE, payload: {entryZone: entryZone}})
//     }
// }

export default connect(mapStateToProps)(EntryZone);