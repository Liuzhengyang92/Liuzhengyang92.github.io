import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    map: null,
    heatmapLayer: null,
    drawingManager: null,
    zoom: 19,
    center: {lat: -33.879944, lng:151.203373},
    devices: null,
    accesspoints: null,
    networkID: 326046,
    apiDataInterval: 1,
}

const initMap = ( state, action ) => {
    return updateObject( state, {
        map: action.payload.map,
    });
};

const initHeatmapLayer = (state, action) => {
    return updateObject( state, {
        heatmapLayer: action.payload.heatmapLayer,
    });
}

const initDrawingTools = (state, action) => {
    return updateObject( state, {
        drawingManager: action.payload.drawingManager,
    });
}

const loadHeatmapLayerDeviceData = (state, action) => {
    return updateObject( state, {devices: action.payload.devices});
};

const loadHeatmapLayerAccessPointData = (state, action) => {
    return updateObject( state, {accesspoints: action.payload.accesspoints});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_MAP: return initMap(state, action);
        case actionTypes.INIT_HEATMAPLAYER: return initHeatmapLayer(state, action);
        case actionTypes.INIT_DRAWINGTOOLS: return initDrawingTools(state, action);
        case actionTypes.LOAD_HEATMAPLAYER_DEVICE_DATA: return loadHeatmapLayerDeviceData(state, action);
        case actionTypes.LOAD_HEATMAPLAYER_ACCESSPOINT_DATA: return loadHeatmapLayerAccessPointData(state, action);
        default:
            return state;
    }
};

export default reducer;