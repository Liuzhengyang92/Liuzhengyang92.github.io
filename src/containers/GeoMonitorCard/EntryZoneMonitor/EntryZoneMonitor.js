import React, {Component} from 'react'
import GeoMonitorCard from '../GeoMonitorCard'
import EntryZoneTable from '../../../components/Chartjs/Table/EntryZoneTable';

class EntryZoneMonitor extends Component {
    


    render () {
        return (
            <GeoMonitorCard
                title={'Entry Zone Recognition'}
            >
            <EntryZoneTable />
            </GeoMonitorCard>
        )
    }
}

export default EntryZoneMonitor;