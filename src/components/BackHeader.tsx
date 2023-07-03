import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import images from '../assets/images';
import useStyle from '../constants/style';
import {dW, dH} from '../Utils/dynamicHeightWidth';
import {useNavigation} from '@react-navigation/native';
const BackHeader = ({heading, onClick, e_style}) => {
  const navigation = useNavigation();
  const styles = useStyle();

  return (
    <View style={styles.back}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground
          resizeMode="contain"
          style={styles.back_img}
          source={images.back}></ImageBackground>
      </TouchableOpacity>

      <ImageBackground
        resizeMode="contain"
        style={styles.curve}
        source={images.curve}></ImageBackground>
      <View style={styles.empview}></View>
    </View>
  );
};
export default BackHeader;
