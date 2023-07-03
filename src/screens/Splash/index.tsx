import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import {getStoreData} from '../../Utils/utilities';

const Splash = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const getUserInfo = async () => {
    await getStoreData('LOGGEDIN_USER').then(userInfo => {
      console.log('User logged-in successfully!', userInfo);
      if (userInfo) {
        global.Uid = userInfo?.user?.uid;
        setTimeout(navigateToHome, 1000);
      } else {
        setTimeout(navigateToMain, 1000);
      }
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  function navigateToMain() {
    navigation.navigate('GetStarted');
  }
  function navigateToHome() {
    navigation.navigate('HomeStack', {
      screen: 'Home',
    });
  }
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <View style={pallete.inheritView}>
        <ImageBackground
          style={style.header_img}
          resizeMode="contain"
          source={images.logo}></ImageBackground>
      </View>
    </SafeAreaView>
  );
};
export default Splash;
