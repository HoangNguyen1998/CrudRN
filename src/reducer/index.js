import {combineReducers} from 'redux';
import blogReducer from './Blog';
import loadingReducer from './Loading';
const rootReducer = combineReducers({
  Blog: blogReducer,
  Loading: loadingReducer,
});
export default rootReducer;
