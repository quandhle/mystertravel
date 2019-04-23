import types from '../actions/types';

const DEFAULT_STATE ={
    auth: false,
    username: '',
    token: '',
    trips_id: null,
    users_id: null
}


export default function tripAuthReducer(state = DEFAULT_STATE, action){
    const {type, username, token, trips_id, users_id} = action
    switch(type){
        case types.SIGN_IN:
        return {...state, auth: true, username, token, trips_id, users_id};
        case types.SIGN_OUT:
        return { ...DEFAULT_STATE};
        default:
        return state;
    }
}