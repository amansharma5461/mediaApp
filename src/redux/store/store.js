import { createStore, applyMiddleware } from 'redux';
import { favoriteReducer } from '../reducers/home.reducer';
import { favoritesMiddleware } from '../../redux/middleware/middleware';

const store = createStore(
  favoriteReducer,
  applyMiddleware(favoritesMiddleware)
);

export default store;
