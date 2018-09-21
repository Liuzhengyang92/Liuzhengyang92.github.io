import React, {Component} from 'react';
import Aux from '../../hocs/Auxiliary/Auxiliary';
import GoogleMap from '../../components/GoogleMap/Map/Map'
import HeatmapLayer from '../../components/GoogleMap/HeatmapLayer/HeatmapLayer'

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
                <GoogleMap>
                    <HeatmapLayer readyToInit={this.state.isMounted}/>
                </ GoogleMap>
            </Aux>        
        )
    }
}

export default Map;