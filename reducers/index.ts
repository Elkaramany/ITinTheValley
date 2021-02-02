import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import ArticlesReducer from './ArticlesReducer';

export default combineReducers({
    SignInReducer,
    ArticlesReducer,
})