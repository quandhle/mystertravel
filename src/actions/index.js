import types from './types';

export function signIn(user) {
    console.log(user)
    localStorage.setItem('signedIn', 'true');
    localStorage.setItem('trips_id', user.trips_id);
    localStorage.setItem('token', user.token);
    return {
        type: types.SIGN_IN,
        username: user.username,
        trips_id: user.trips_id,
        guest: user.is_guest
    }
}

export function signOut(){
    localStorage.removeItem('signedIn');
    localStorage.removeItem('trips_id');
    localStorage.removeItem('token');
    return {
        type:types.SIGN_OUT
    }
}


export function passTripId(id){
    console.log('passtripid',id);
    localStorage.setItem('trips_id', id);
    return{
        type: types.GET_TRIP_ID,
        trips_id: id
    }
}

export function clearTripId(){
    localStorage.removeItem('trips_id');
    return{
        type: types.CLEAR_TRIP_ID,
        trips_id: null
    }
}
