import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import home from './reducers/homeReducer';
import common from './reducers/commonReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  home,
  common
});
