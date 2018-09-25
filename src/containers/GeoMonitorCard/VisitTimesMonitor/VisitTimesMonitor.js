import React, {Component} from 'react'
import GeoMonitorCard from '../GeoMonitorCard'
import VisitTimesTable from '../../../components/Chartjs/Table/VisitTimesTable';

class VisitTimesMonitor extends Component {
    


    render () {
        return (
            <GeoMonitorCard
                title={'Top 10 Visit Times'}
            >
            <VisitTimesTable />
            </GeoMonitorCard>
        )
    }
}

export default VisitTimesMonitor;