import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../../redux/actions/home.action';
import heartImage from '../../../assets/images/heart.png';

const FavoriteScreen = ({ navigation }) => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemove = (colorId) => {
    dispatch(removeFavorite(colorId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.colorItem}>
      <TouchableOpacity
        style={styles.colorInfo}
        onPress={() => navigation.navigate('Details', { color: item })}
      >
        <View style={[styles.colorPreview, { backgroundColor: `#${item.hex}` }]} />
        <Text style={styles.colorTitle}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Image
          source={heartImage}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
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
    tintColor: 'red',
  },
});

export default FavoriteScreen;
