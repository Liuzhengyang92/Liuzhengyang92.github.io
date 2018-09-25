import React, {Component} from 'react'

import GeoMonitorCard from '../GeoMonitorCard'
import Typography from '@material-ui/core/Typography';

const data = {
    labels: [ '17 Sep', 'Sep 18', 'Sep19', 'Sep20', 'Sep21', 'Sep22', 'Sep23', 'Sep24','Sep25'],
    datasets: [
      {
        label: 'Common Peak Time',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,1,1,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [16.30,15.21,16.16,16.12,15.21,17.12,15.45,16.32,15.33],
      }
    ]
  };

class GeoFencingMonitor extends Component {
    


    render () {
        return (
            <GeoMonitorCard
                title={'Peak Time'}
                data={data}
            >
                <Typography>Common Peak Time: 15:00-17:00</Typography>                                            
            </GeoMonitorCard>
        )
    }
}

export default GeoFencingMonitor;