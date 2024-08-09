import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITES } from '../../redux/type/type';
const FAVORITES_STORAGE_KEY = 'FAVORITES_STORAGE_KEY';

export const favoritesMiddleware = store => next => action => {
  if (action.type === ADD_FAVORITE || action.type === REMOVE_FAVORITE) {
    const result = next(action);

    const { favorites } = store.getState();
    AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
      .catch(error => console.error('Failed to save favorites to AsyncStorage:', error));

    return result;
  }

  return next(action);
};