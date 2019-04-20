import types from '../actions/types';

const DEFAULT_STATE = {
    tripId: null
}

export default function tripReducer(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_TRIP_ID:
        console.log("Trip reducer:", action.tripId);
        return {...state, tripId: action.tripId}
        default:
        return state
    }
}