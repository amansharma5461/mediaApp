import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITES } from '../../redux/type/type';

export const addFavorite = color => ({
  type: ADD_FAVORITE,
  payload: color,
});

export const removeFavorite = colorId => ({
  type: REMOVE_FAVORITE,
  payload: colorId,
});

export const loadFavorites = colors => ({
  type: LOAD_FAVORITES,
  payload: colors,
});
