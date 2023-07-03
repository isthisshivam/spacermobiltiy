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
import {useNavigation} from '@react-navigation/native';
import useStyle from '../constants/style';
const ProductHeader = ({heading, onClick, e_style, backgroundColor}) => {
  const navigation = useNavigation();
  const style = useStyle();
  return (
    <View
      style={{
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: backgroundColor ? backgroundColor : 'white',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={style.center}>
        <ImageBackground
          resizeMode="contain"
          style={style.ballk}
          source={images.back}></ImageBackground>
      </TouchableOpacity>

      <Text style={style.headingProduct}>{heading}</Text>
      <View style={style.empview}></View>
    </View>
  );
};
export default ProductHeader;
