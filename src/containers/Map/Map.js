import React, {Component} from 'react';
import GoogleMap from '../../components/GoogleMap/Map/Map'
import HeatmapLayer from '../../components/GoogleMap/HeatmapLayer/HeatmapLayer'
import DrawingTools from '../../components/GoogleMap/DrawingTools/DrawingTools'

import Grid from '@material-ui/core/Grid';

import classes from "./Map.css";
import Aux from '../../hocs/Auxiliary/Auxiliary';

import GeoFencingMonitor from '../GeoMonitorCard/GeoFencingMonitor/GeoFencingMonitor'
import GeoBlockingMonitor from '../GeoMonitorCard/GeoBlockingMonitor/GeoBlockingMonitor'

// import GeoMonitorCard from '../GeoMonitorCard/GeoMonitorCard';
// import Line from "../../components/Chartjs/Line/Line"

class Map extends Component {

    constructor(props){
        super(props);
        this.state = {
            isMounted: false,
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state, 
            isMounted: true
        })
    }

    render () {
        return (
            <Aux>
                <Grid container >
                    <Grid className={classes.map} item xs={8}>
                            <GoogleMap>
                                <HeatmapLayer readyToInit={this.state.isMounted}/>
                                <DrawingTools readyToInit={this.state.isMounted}/>
                            </GoogleMap>
                    </Grid>
                    <Grid item xs={4}>
                            <GeoFencingMonitor />
                            <GeoBlockingMonitor />
                    </Grid>
                </Grid>
            </Aux>
        )
    }
}

export default Map;