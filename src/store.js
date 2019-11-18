import {createStore, applyMiddleware} from 'redux';
import createReducer from './reducer';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {promiseMiddleware, localStorageMiddleware} from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {RECORDING_ACTIONS} from './middleware';

export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), promiseMiddleware, localStorageMiddleware];

const store = createStore(createReducer(history), composeWithDevTools(applyMiddleware(...middlewares)));

RECORDING_ACTIONS.forEach(type => {
  let payload = window.localStorage.getItem(type);
  if (payload) {
    payload = JSON.parse(payload);
    store.dispatch({type, payload});
  }
});

export default store;