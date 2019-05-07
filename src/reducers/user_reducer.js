import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    username: '',
    trips_id: null,
    guest: true
};

const TripAuthReducer = (state = DEFAULT_STATE, action) => {
    const {type, username, trips_id, guest} = action

    switch(type) {
        case types.SIGN_IN:
            return {
                ...state, 
                auth: true, 
                username, 
                trips_id,
                guest
            };
        case types.GET_TRIP_ID:
            return {
                ...state,
                trips_id: action.trips_id
            };
        case types.CLEAR_TRIP_ID:
            return {
                ...state,
                trips_id: null
            };
        case types.SIGN_OUT:
            return { ...DEFAULT_STATE};
        default:
            return state;
    }
}

export default TripAuthReducer;
