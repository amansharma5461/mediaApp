import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../redux/actions/home.action';
import heartImage from '../../../assets/images/heart.png';

const HomeScreen = ({ navigation }) => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchColors = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://www.colourlovers.com/api/colors/new?format=json');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Error in home-api');
        }
        
        const data = await response.json();
        setColors(data);
      } catch (error) {
        setError(`Failed to fetch colors: ${error.message}`);
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const isFavorite = (colorId) => favorites.some(fav => fav.id === colorId);

  const toggleFavorite = (color) => {
    if (isFavorite(color.id)) {
      dispatch(removeFavorite(color.id));
    } else {
      dispatch(addFavorite(color));
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={colors}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.colorItem}
            onPress={() => navigation.navigate('Details', { color: item })}
          >
            <View style={styles.colorInfo}>
              <View style={[styles.colorPreview, { backgroundColor: `#${item.hex}` }]} />
              <Text style={styles.colorTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Image
                source={heartImage}
                style={[
                  styles.icon,
                  { tintColor: isFavorite(item.id) ? 'red' : 'black' }
                ]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  colorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  colorTitle: {
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
