import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionsType from '../../store/actions'

class Heatmap extends Component {
    render () {
        return (
            <div>
            </div>
        );
    }
}

// the state here is the global state
const mapStateToProps = state => {
    return {
        heatmapData: state.heatmap.heatmapData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHeatmapInit: () => dispatch({type: actionsType.INIT_HEATMAP}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heatmap);