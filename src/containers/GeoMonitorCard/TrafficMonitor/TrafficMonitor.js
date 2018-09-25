import React, {Component} from 'react'

import GeoMonitorCard from '../GeoMonitorCard'
import Typography from '@material-ui/core/Typography';

const data = {
    labels: [ '00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'],
    datasets: [
      {
        label: 'Number of Users',
        fill: false,
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
        data: [926,1410,3329,3124,3026,2976,2445],
      }
    ]
  };

class GeoFencingMonitor extends Component {
    


    render () {
        return (
            <GeoMonitorCard
                title={'Traffic Time'}
                data={data}
            >
                <Typography>Number of Users</Typography>                                            
            </GeoMonitorCard>
        )
    }
}

export default GeoFencingMonitor;