import React, {useEffect, useContext} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import {setItem} from '../Utils/utilities';

import {convertFCMToken} from './PostApiCall';
export function setupPushNotification(callBackIos) {
  if (Platform.OS == 'android') {
    PushNotification.createChannel(
      {
        channelId: 'SPACER_PUSH_CHANNEL_ID', // (required)
        channelName: 'SPACER_PUSH_CHANNEL_ID', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)

    onRegister: async function (token) {
      if (Platform.OS == 'android') {
        console.log('REGISTRATION Token==== ', JSON.stringify(token));
        console.log('REGISTRATION Token==== ', token.token);
        await setItem('F_TOKEN', token.token);
        callBackIos(token?.token);
      } else {
        console.log('Firebase_Track_token_fcm', token?.token);
        convertToken(token?.token);
      }
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      alert(err);
      console.log('REGISTRATION ERROR==== ', err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  const convertToken = async token => {
    const bodyParams = {
      application: 'com.comptrainsport.dev',
      sandbox: true,
      apns_tokens: [token],
    };

    const responseJson = await convertFCMToken(bodyParams);
    console.log(
      'Firebase_Track_token_converted',
      responseJson.data.results[0].registration_token,
    );
    await setItem('F_TOKEN', responseJson.data.results[0].registration_token);
    callBackIos(responseJson.data.results[0].registration_token);
  };

  return PushNotification;
}

export function triggerPushNotification(handleNotification) {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      // process the notification
      if (notification?.userInteraction === true) {
        // this.goTo(notification);

        handleNotification(notification, 1);
      } else {
        handleNotification(notification, 2);
      }

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.log('REGISTRATION ERROR==== ', err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  return PushNotification;
}
