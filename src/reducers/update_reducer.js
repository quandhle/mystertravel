import types from '../actions/types';

const DEFAULT_STATE = {
    data: null
};

export default function updateReducer(state = DEFAULT_STATE, action){
    
    switch(action.type){
        case types.LOAD_DATA:
            return {
                ...state,
                data: action.data
            };
        default:
            return state
    }
}