import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    map: null,
    heatmapLayer: null,
    zoom: 19,
    center: {lat: -33.879944, lng:151.203373},
    devices: null,
    accesspoints: null,
}

const heatmapInit = ( state, action ) => {
    return updateObject( state, {
        map: action.payload.map, 
        heatmapLayer: action.payload.heatmapLayer,
    });
};

const heatmapUpdateDevices = (state, action) => {
    return updateObject( state, {devices: action.payload.devices});
};

const heatmapUpdateAccessPoints = (state, action) => {
    return updateObject( state, {accesspoints: action.payload.accesspoints});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_HEATMAP: return heatmapInit(state, action);
        case actionTypes.UPDATE_DEVICES_HEATMAP: return heatmapUpdateDevices(state, action);
        case actionTypes.UPDATE_ACCESSPOINTS_HEATMAP: return heatmapUpdateAccessPoints(state, action);
        default:
            return state;
    }
};

export default reducer;