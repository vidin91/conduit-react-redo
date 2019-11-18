import {
  ASYNC_START,
  ASYNC_END,
  ASYNC_ERROR,
  LOGIN,
  LOGOUT
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ASYNC_START:
      return {
        ...state,
        isLoading: true,
        loginError: null,
        requestError: null
      };
    case ASYNC_END:
    case ASYNC_ERROR:
      return {
        ...state,
        isLoading: false,
        requestError: action.subtype !== LOGIN && action.payload,
        loginError: action.subtype == LOGIN && action.payload
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload.user
      };
    case LOGOUT:
      return {
        ...state,
        user: undefined
      };
    default:
      return state;
  }
}
