import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITES } from '../../redux/type/type';

const initialState = {
  favorites: [],
};

export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(color => color.id !== action.payload),
      };
    case LOAD_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};
