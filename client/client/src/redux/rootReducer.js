import { combineReducers } from 'redux'; 
import moviesReducer from './moviesReducer';
import subscriptionsReducer from './subscriptionsReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  subscriptions: subscriptionsReducer,
});

export default rootReducer;
