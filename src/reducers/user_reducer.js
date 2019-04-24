import types from '../actions/types';

const DEFAULT_STATE ={
    auth: false,
    username: '',
    trips_id: null
}


export default function tripAuthReducer(state = DEFAULT_STATE, action){
    const {type, username, trips_id} = action
    switch(type){
        case types.SIGN_IN:
        return {...state, auth: true, username, trips_id};
        case types.SIGN_OUT:
        return { ...DEFAULT_STATE};
        default:
        return state;
    }
}