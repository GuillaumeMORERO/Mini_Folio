import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

import rootReducer from './reducer';

import authMiddleware from './middlewares/authMiddleware';
import apiRequestMiddleware from './middlewares/apiRequestMiddleware';

let middles = [thunk, authMiddleware]
// pour conditionner l'application d'un middlaware :
// let middleware = [a, b]
// if (process.env.NODE_ENV !== 'production') {
//   const c = require('some-debug-middleware')
//   const d = require('another-debug-middleware')
//   middleware = [...middleware, c, d]
// }

const reactModelStore = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(...middles)),
)

export default reactModelStore;