import React, {Component} from 'react'

import GeoMonitorCard from '../GeoMonitorCard'
import Typography from '@material-ui/core/Typography';

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug','Sep'],
    datasets: [
      {
        label: 'Number of Target Devices',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
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
        data: [2000,2321,3216,2312,3321,3212,3145,6432,7893],
      }
    ]
  };

class GeoBlockingMonitor extends Component {
    render () {
        return (
            <GeoMonitorCard
                title={'Geo Blocking'}
                data={data}
            >
                <Typography>Number of Devices: 5332</Typography>                                            
            </GeoMonitorCard>
        )
    }
}

export default GeoBlockingMonitor;