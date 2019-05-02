import types from './types';

export function signIn(user) {
    localStorage.setItem('signedIn', 'true');
    return {
        type: types.SIGN_IN,
        username: user.username,
        trips_id: user.trips_id
    }
}

export function signOut(){
    localStorage.removeItem('signedIn');
    return {
        type:types.SIGN_OUT
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

export function updateNote(data){

    return{
        type: types.LOAD_DATA,
        data: data
    }
}