import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import tripReducer from './trip_reducer';
import navReducer from './nav_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    trips_id: tripReducer,
    navHeader: navReducer
});

export default rootReducer;