import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    zoom: 19,
    center: {lat: -33.879944, lng:151.203373},
    accessPoints: [],
    devices: [],
    heatmapRawData: [{lat: -33.879945, lng:151.203373},]
}

const heatmapInit = ( state, action ) => {
    console.log('[UPDATE]')
    return updateObject( 
        state,
        {
            zoom: 10,
            // heatmapRawData: [{lat: -33.879944, lng:151.203373},]
        }
    );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_HEATMAP: return heatmapInit(state, action);
        default:
            return state;
    }
};

export default reducer;