import types from './types';

export function signIn(user) {
    return {
        type: types.SIGN_IN,
        username: user.username,
        trips_id: user.trips_id
    }
    // const resp = await axios.post('/api/login.php', {
    //     email: user.email,
    //     password: user.password
    // })
    // console.log('user sign in:',resp.data);

    // const {success, trips_id, username} = resp.data

    // if(success){
    //     localStorage.setItem('signedIn', 'true');
    //     if(trips_id){
    //        passTripId(trips_id); 
    //     }
        
    //     return dispatch({
    //         type: types.SIGN_IN,
    //         username: username,
    //         trips_id: trips_id
    //     })
    // }

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