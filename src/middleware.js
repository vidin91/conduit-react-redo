import {ASYNC_START, ASYNC_END, ASYNC_ERROR, LOGIN, LOGOUT} from './actions';

export const RECORDING_ACTIONS = [LOGIN];

// TODO - what about orders ??
export const promiseMiddleware = (store) => next => action => {
  if (action.payload instanceof Promise) {
    store.dispatch({type: ASYNC_START, subtype: action.type});
    action.payload
      .then(res => {
        store.dispatch({type: ASYNC_END, subtype: action.type}); // TODO - check;
        store.dispatch({type: action.type, payload: res});
      })
      .catch(error => {
        if (error.message) {
          // when throwing Error
          error = error.message;
        }
        store.dispatch({type: ASYNC_ERROR, subtype: action.type, payload: error});
      })
  } else {
    return next(action);
  }
}

export const localStorageMiddleware = () => next => action => {
  if (action.type === LOGIN) {
    window.localStorage.setItem(LOGIN, JSON.stringify(action.payload));
  } else if (action.type === LOGOUT) {
    window.localStorage.removeItem(LOGIN);
  }
  return next(action);
}
