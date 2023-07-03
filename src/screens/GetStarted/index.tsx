import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import usePallete from '../../assets/Pallete';
import images from '../../assets/images';

import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import useStyle from './style';
const GetStarted = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();

  function navigateToRegister() {
    navigation.navigate('AuthStack', {
      screen: 'Register',
    });
  }
  function navigateToLogin() {
    navigation.navigate('AuthStack', {
      screen: 'Login',
    });
  }
  useEffect(() => {
    console.log('getstarted');
  }, []);
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <ImageBackground
        resizeMode="cover"
        style={style.header_img}
        source={images.getstartedback}>
        <ImageBackground
          resizeMode="contain"
          style={style.curve_img}
          source={images.curve}></ImageBackground>
      </ImageBackground>
      <Text style={style.recovery}>RECOVERY FROM</Text>
      <Text style={style.ground}>THE GROUND UP</Text>
      <Text style={style.access}>Access in-depth product tutorials</Text>
      <Text style={style.and}>and targated programs.</Text>
      <PrimaryButton
        heading={'GET STARTED'}
        onClick={() => navigateToRegister()}></PrimaryButton>
      <Text style={style.have}>
        Have an account?
        <Text onPress={() => navigateToLogin()} style={style.login}>
          {` Login`}
        </Text>
      </Text>
    </SafeAreaView>
  );
};
export default GetStarted;
