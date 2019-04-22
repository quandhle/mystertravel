import types from './types';

export function signIn(user){
    console.log('user:',user);
    return{
        type: types.SIGN_IN,
        username: user.username,
        token: user.token
    }
}


export function passTripId(id){
    return{
        type: types.GET_TRIP_ID,
        trips_id: id
    }
}