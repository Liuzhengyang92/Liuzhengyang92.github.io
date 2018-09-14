import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    heatmapData: []
}

const heatmapInit = ( state, action ) => {
    return updateObject( state, {heatmapData: []} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INIT_HEATMAP: return heatmapInit(state, action);
        default:
            return state;
    }
};

export default reducer;