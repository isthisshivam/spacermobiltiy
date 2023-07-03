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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Splash from '../screens/Splash/index';
import AuthStack from './authStack';
import GetStarted from '../screens/GetStarted';
import HomeStack from './homeStack';
import Home from '../screens/Home';
import ProgramDetails from '../screens/ProgramDetails';
import ViewFullProgram from '../screens/ViewFullProgram';
import Profile from '../screens/Profile';
import Products from '../screens/Products';
import EditProfile from '../screens/EditProfile';
import EditField from '../screens/EditProfile/EditFields';
import {dH, dW} from '../Utils/dynamicHeightWidth';
import images from '../assets/images';
import Store from '../screens/Store/index';
import ProfileStack from './ProfileStack';

const Tab_Navigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#474747',
          paddingBottom: 4,
          alignItems: 'center',
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height: dH(16),
                marginTop: 0,
                width: dW(16),
                tintColor: color,
                resizeMode: 'cover',
              }}
              source={images.home}></Image>
          ),
        }}
      />
      <Tab.Screen
        name={'Store'}
        component={Store}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height: dH(17),
                marginTop: 0,
                width: dW(17),
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={images.bag}></Image>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height: dH(17),
                marginTop: 0,
                width: dW(17),
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={images.user}></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tab_Navigator;
