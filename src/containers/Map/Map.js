import React, {Component} from 'react';
import GoogleMap from '../../components/GoogleMap/Map/Map'
import axios from '../../axios';
import * as actionsType from '../../store/actions/actionTypes';
import HeatmapLayer from '../../components/GoogleMap/HeatmapLayer/HeatmapLayer'
import DrawingTools from '../../components/GoogleMap/DrawingTools/DrawingTools'
import EntryZone from '../../components/GoogleMap/EntryZone/EntryZone'

import Grid from '@material-ui/core/Grid';

import classes from "./Map.css";
import Aux from '../../hocs/Auxiliary/Auxiliary';

import GeoFencingMonitor from '../GeoMonitorCard/GeoFencingMonitor/GeoFencingMonitor'
import GeoBlockingMonitor from '../GeoMonitorCard/GeoBlockingMonitor/GeoBlockingMonitor'
import EntryZoneMonitor from '../GeoMonitorCard/EntryZoneMonitor/EntryZoneMonitor'
import TrafficMonitor from '../GeoMonitorCard/TrafficMonitor/TrafficMonitor'
import DwellTimeMonitor from '../GeoMonitorCard/DwellTimeMonitor/DwellTimeMonitor'
import PeakTimeMonitor from '../GeoMonitorCard/PeakTimeMonitor/PeakTimeMonitor'
import OverviewMonitor from '../GeoMonitorCard/OverviewMonitor/OverviewMonitor';

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
                <Grid container  spacing={16}>
                    <Grid className={classes.map} item xs={8}>
                            <GoogleMap>
                                <HeatmapLayer readyToInit={this.state.isMounted}/>
                                <DrawingTools readyToInit={this.state.isMounted}/>
                                <EntryZone readyToInit={this.state.isMounted}/>
                            </GoogleMap>
                    </Grid>

                    <Grid className={classes.entryzonemonitor} item xs={4}>
                        <EntryZoneMonitor />
                    </Grid>  

                    <Grid item xs={6}>
                        <GeoFencingMonitor />
                    </Grid>
                    <Grid item xs={6}>
                        <GeoBlockingMonitor />
                    </Grid>       
                    
                    <Grid item xs={4}> 
                        <TrafficMonitor />
                    </Grid>        

                    <Grid item xs={4}>
                        <DwellTimeMonitor />
                    </Grid>

                    <Grid item xs={4}>
                        <PeakTimeMonitor />
                    </Grid>
                  
                    
                    <Grid item xs={12}>
                        <OverviewMonitor />
                    </Grid>

                </Grid>
                
            </Aux>
        )
    }
}

export default Map;