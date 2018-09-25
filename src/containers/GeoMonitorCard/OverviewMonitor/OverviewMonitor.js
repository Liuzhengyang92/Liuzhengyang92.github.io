import React, {Component} from 'react'
import GeoMonitorCard from '../GeoMonitorCard'
import OverviewTable from '../../../components/Chartjs/Table/OverviewTable';

class EntryZoneMonitor extends Component {
    


    render () {
        return (
            <GeoMonitorCard
                title={'Overview Table'}
            >
            <OverviewTable />
            </GeoMonitorCard>
        )
    }
}

export default EntryZoneMonitor;