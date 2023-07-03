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
import {dW, dH} from '../Utils/dynamicHeightWidth';
import useStyle from '../constants/style';

const PrimaryHeader = ({heading, onClick, e_style}) => {
  const style = useStyle();
  return (
    <View style={style.primaryHeader}>
      <View style={style.back_img}></View>

      <ImageBackground
        resizeMode="contain"
        style={style.curve_long}
        source={images.curve}></ImageBackground>
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={onClick}>
        <ImageBackground
          resizeMode="contain"
          style={style.back_img_ext}
          source={images.cross}></ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
export default PrimaryHeader;
