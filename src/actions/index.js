import types from './types';
import axios from 'axios';

export const signIn = (user)=>async dispatch=> {
    const resp = await axios.post('/api/login.php', {
        email: user.email,
        password: user.password
    })
    console.log('user sign in:',resp.data);
    if(resp.data.success){
        localStorage.setItem('signedIn', 'true');

        return dispatch({
            type: types.SIGN_IN,
            username: resp.data.username,
            trips_id: resp.data.trips_id
        })
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