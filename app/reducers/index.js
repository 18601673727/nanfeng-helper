// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import home from './home';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    home,
    counter
  });
}
