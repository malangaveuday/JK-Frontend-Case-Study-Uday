import { combineReducers } from 'redux';
import homeStore from './homeReducer';
import userStore from './usersReducer';

const rootReducer = combineReducers({
  homeStore,
  userStore
});

export default rootReducer;
