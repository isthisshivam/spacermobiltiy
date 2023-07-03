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
import Home from '../screens/Home';
import ProgramDetails from '../screens/ProgramDetails';
import ProductTutorialDetail from '../screens/ProductTotorialDetails';
import ViewFullProgram from '../screens/ViewFullProgram';
import Profile from '../screens/Profile';
import Products from '../screens/Products';
import EditProfile from '../screens/EditProfile';
import EditField from '../screens/EditProfile/EditFields';
import WalkThrough from '../screens/WalkThrough';
import Mobility from '../screens/Mobility';
import Chat from '../screens/Chat';
import OpenProgram from '../screens/OpenProgram';
import OpenMobility from '../screens/OpenMobility';
import MobilityDetails from '../screens/MobilityDetails';
import AllProductsTutorials from '../screens/AllProductsTutorials';
import AllPrograms from '../screens/AllPrograms';
const HomeStack = route => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        name="ProgramDetails"
        component={ProgramDetails}></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={ViewFullProgram}
        name="ViewFullProgram"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={AllProductsTutorials}
        name="AllProductsTutorials"></Stack.Screen>

      <Stack.Screen
        options={{headerShown: false}}
        component={Products}
        name="Products"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={EditProfile}
        name="EditProfile"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={EditField}
        name="EditField"></Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        component={WalkThrough}
        name="WalkThroughh"></Stack.Screen>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Mobility"
        component={Mobility}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="OpenProgram"
        component={OpenProgram}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="MobilityDetails"
        component={MobilityDetails}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="OpenMobility"
        component={OpenMobility}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="ProductTutorialDetail"
        component={ProductTutorialDetail}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="AllPrograms"
        component={AllPrograms}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default HomeStack;
