import types from '../actions/types';

const DEFAULT_STATE ={
    auth: false,
    username: '',
    token: ''
}


export default function tripAuthReducer(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.SIGN_IN:
        return {...state, auth: true, username: action.username, token: action.token}
        default:
        return state;
    }
}