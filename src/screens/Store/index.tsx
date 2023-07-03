import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import DrawerHeader from '../../components/DrawerHeader';
import SafariView from 'react-native-safari-view';
import colors from '../../constants/colors';
import secrets from '../../constants/secrets';
import Webview from '../../components/Webview';

const Store = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  // useFocusEffect(() => {
  //   _pressHandler();
  // });

  // function _pressHandler() {
  //   SafariView.isAvailable()
  //     .then(
  //       SafariView.show({
  //         url: secrets.store,
  //       }),
  //     )
  //     .catch(error => {
  //       // Fallback WebView code for iOS 8 and earlier
  //     });
  // }
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      {/* <DrawerHeader
        onClick={() => props.navigation.openDrawer()}
        backgroundColor={colors.profileback}
      /> */}
      <Webview uri={secrets.store} />
    </SafeAreaView>
  );
};
export default Store;
