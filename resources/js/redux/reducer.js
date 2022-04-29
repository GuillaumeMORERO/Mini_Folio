import { combineReducers } from 'redux'

import filmsReducer from './reducers/filmsReducer';
import userReducer from './reducers/userReducer';
import booksReducer from './reducers/booksReducer';
import newsReducer from './reducers/newsReducer';
import jvReducer from './reducers/jvReducer';

const rootReducer = combineReducers({
    filmsReducer, userReducer, booksReducer, newsReducer, jvReducer
});
export default rootReducer
