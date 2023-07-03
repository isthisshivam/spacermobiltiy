import React, {useState, useEffect, useRef} from 'react';
import {
  createStackNavigator,
  TransitionPreset,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Splash from '../screens/Splash/index';
import AuthStack from './authStack';
import GetStarted from '../screens/GetStarted';
import DrawerNavigator from './DrawerStack';

const Root = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        component={Splash}
        name={'Splash'}></Stack.Screen>
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}></Stack.Screen>

      <Stack.Screen
        name="HomeStack"
        component={DrawerNavigator}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default Root;
