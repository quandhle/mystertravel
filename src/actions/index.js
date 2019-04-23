import types from './types';

export function signIn(user){
    console.log('user:',user);
    return{
        type: types.SIGN_IN,
        username: user.username,
        token: user.token,
        trips_id: user.trips_id,
        users_id: user.users_id
    }
}


export function passTripId(id){
    return{
        type: types.GET_TRIP_ID,
        trips_id: id
    }
}

export function clearTripId(){
    return{
        type: types.CLEAR_TRIP_ID,
        trips_id: null
    }
}