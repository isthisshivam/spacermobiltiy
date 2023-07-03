import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import secrets from '../constants/secrets';
import {WebView} from 'react-native-webview';
const Webview = props => {
  const {uri} = props;
  return (
    <WebView
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      source={{uri: uri}}
    />
  );
};

export default Webview;
