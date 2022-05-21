import { routerReducer } from 'connected-next-router';
import { combineReducers } from 'redux';
import { galleryReducer } from './gallery';

const rootReducer = combineReducers({
  router: routerReducer,
  gallery: galleryReducer,
});

export default rootReducer;
