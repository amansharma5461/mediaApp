import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/redux/store/store';
import Navigation from './src/component/navigation/navigation';
import { LOAD_FAVORITES } from './src/redux/type/type';

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavoritesFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('FAVORITES_STORAGE_KEY');
        if (storedFavorites) {
          dispatch({ type: LOAD_FAVORITES, payload: JSON.parse(storedFavorites) });
        }
      } catch (error) {
        console.error('Error AsyncStorage:', error);
      }
    };

    loadFavoritesFromStorage();
  }, [dispatch]);

  return <Navigation />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
};

export default App;


