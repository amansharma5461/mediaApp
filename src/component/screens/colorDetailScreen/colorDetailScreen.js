import React from 'react';
import { View, Text, Button, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../redux/actions/home.action';

const ColorDetailScreen = ({ route }) => {
  const { color } = route.params || {}; 
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  if (!color) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Color details not available.</Text>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === color.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(color.id));
    } else {
      dispatch(addFavorite(color));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.colorPreview, { backgroundColor: `#${color.hex}` }]} />
      <Text style={styles.title}>{color.title}</Text>
      <Text style={styles.details}>Hex: #{color.hex}</Text>
      <Text style={styles.details}>RGB: {color.rgb.red}, {color.rgb.green}, {color.rgb.blue}</Text>
      {color.imageUrl && (
        <Image source={{ uri: color.imageUrl }} style={styles.imagePreview} />
      )}
      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleFavoriteToggle}
      />
      {isFavorite && <Text style={styles.favoriteMessage}>This color is in your favorites</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  colorPreview: {
    width: 150,
    height: 150,
    marginTop:15,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginVertical: 8,
  },
  favoriteMessage: {
    marginTop: 16,
    color: 'green',
  },
});

export default ColorDetailScreen;

