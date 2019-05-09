import types from './types';

export function signIn(user) {
    localStorage.setItem('signedIn', 'true');
    localStorage.setItem('trips_id', user.trips_id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('user_id', user.users_id);
    return {
        type: types.SIGN_IN,
        username: user.username,
        trips_id: user.trips_id,
        guest: user.is_guest
    };
}

export function signOut() {
    localStorage.removeItem('signedIn');
    localStorage.removeItem('trips_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    return {
        type: types.SIGN_OUT
    };
}


export function passTripId(id) {
    localStorage.setItem('trips_id', id);

    return {
        type: types.GET_TRIP_ID,
        trips_id: id
    };
}

export function clearTripId() {
    localStorage.removeItem('trips_id');

    return {
        type: types.CLEAR_TRIP_ID,
        trips_id: null
    };
}
