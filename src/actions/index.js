import types from './types';

export function signIn(user){
    return{
        type: types.SIGN_IN,
        username: user.username
    }
}


export function passTripId(id){
    return{
        type: types.GET_TRIP_ID,
        tripId: id
    }
}