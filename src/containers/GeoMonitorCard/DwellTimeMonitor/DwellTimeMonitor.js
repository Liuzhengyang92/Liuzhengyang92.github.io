import React, {Component} from 'react'

import GeoMonitorCard from '../GeoMonitorCard'
import Typography from '@material-ui/core/Typography';

const data = {
    labels: [ '00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'],
    datasets: [
      {
        label: 'Dwell time(min)',
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
        data: [30.2,23.2,32.1,23.2,33.1,32.2,31.5,13.2,9.3],
      }
    ]
  };

class GeoFencingMonitor extends Component {
    


    render () {
        return (
            <GeoMonitorCard
                title={'Dwell Time'}
                data={data}
            >
                <Typography>Average Dwell Time: 28.5 min</Typography>                                            
            </GeoMonitorCard>
        )
    }
}

export default GeoFencingMonitor;