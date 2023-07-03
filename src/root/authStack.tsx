import React, {useState, useEffect, useRef} from 'react';
import {
  createStackNavigator,
  TransitionPreset,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Splash from '../screens/Splash/index';
import Register from '../screens/Register';
import Login from '../screens/Login';
import WalkThrough from '../screens/WalkThrough';
import ForgotPassword from '../screens/ForgotPassword';
const AuthStack = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        component={Login}
        name={'Login'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={Register}
        name={'Register'}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={WalkThrough}
        name={'WalkThrough'}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={ForgotPassword}
        name={'ForgotPassword'}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default AuthStack;
