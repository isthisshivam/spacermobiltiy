import React, {useState, useEffect, useRef} from 'react';
import {
  createStackNavigator,
  TransitionPreset,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import Home from '../screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Drawer_Content from '../components/DrawerContent';
import Profile from '../screens/Profile';
import Store from '../screens/Store';
import ProfileStack from './ProfileStack';
import Tab_Navigator from './tabNavigator';
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={props => <Drawer_Content {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '55%',
        },
      }}>
      <Drawer.Screen name="Home" component={Tab_Navigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
