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
import {dW, dH, windowHeight, windowWidth} from '../Utils/dynamicHeightWidth';
import useStyle from '../constants/style';
const MobilityWalkThrough = ({heading, onClick, e_style}) => {
  const style = useStyle();
  return (
    <View style={style.tutorial}>
      {/* <ImageBackground
        resizeMode="contain"
        style={{
          height: 390,
          width: 430,
          position: 'absolute',
          alignSelf: 'center',
          marginTop: dW(-30),
        }}
        source={images.exerciseBack}></ImageBackground> */}
      <ImageBackground
        resizeMode="contain"
        style={{
          height: 390,
          width: 440,
          marginTop: dW(-55),
          marginLeft: 22,
          alignSelf: 'center',
        }}
        source={images.exerciseFirst}></ImageBackground>

      <Text style={style.tut1}>LET’S TEST YOUR MOBILITY</Text>
      <Text style={style.explore}>
        Test your foot mobility with our Mobility Program to see where you need
        to improve.
      </Text>
    </View>
  );
};
export default MobilityWalkThrough;
