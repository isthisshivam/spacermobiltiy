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
import {useNavigation} from '@react-navigation/native';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';
import CompletedPrograms from '../screens/CompletedPrograms';
const ProfileStack = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        name="CompletedPrograms"
        component={CompletedPrograms}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default ProfileStack;
