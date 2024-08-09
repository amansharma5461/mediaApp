import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/homeScreen/homeScreen';
import FavoriteScreen from '../screens/favoriteScreen/favoriteScreen';
import ColorDetailScreen from '../screens/colorDetailScreen/colorDetailScreen';
const Tab = createMaterialTopTabNavigator();


const Navigation = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Favorites" component={FavoriteScreen} />
          <Tab.Screen name="Details" component={ColorDetailScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Navigation;