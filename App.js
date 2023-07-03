/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, createContext, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
console.disableYellowBox = true;
import {getStoreData, setStoreData} from './src/Utils/utilities';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Root from './src/root/root';
import {NavigationContainer} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import secrets from './src/constants/secrets';
import auth from '@react-native-firebase/auth';
import {setupPushNotification} from './src/Utils/PushNotification';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: secrets.apiKey,
        authDomain: secrets.authDomain,
        projectId: secrets.projectId,
        storageBucket: secrets.storageBucket,
        messagingSenderId: secrets.messagingSenderId,
        appId: secrets.appId,
        measurementId: secrets.measurementId,
      };

      firebase.initalizing(firebaseConfig);
    }
  }, []);
  useEffect(() => {
    console.log('App');
    signInAnonymously();
  }, []);
  signInAnonymously = async () => {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const token = await getStoreData('F_TOKEN');

      if (typeof token == 'undefined' || token == null) {
        setupPushNotification(tokenCallBack);
      } else {
        tokenCallBack(token);
      }
    }
    fetchData();
  }, []);
  const tokenCallBack = async tkn => {
    const token = await setStoreData('F_TOKEN', tkn);
    // setfcmToken(token);
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
