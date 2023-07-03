import React, {useState, useEffect, useRef} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import colors from '../constants/colors';
import images from '../assets/images';
import {dW, dH, windowHeight, windowWidth} from '../Utils/dynamicHeightWidth';
import useStyle from '../constants/style';
const TutorialsWalkThrough = ({heading, onClick, e_style}) => {
  const style = useStyle();
  return (
    <View style={style.tutorial}>
      <ImageBackground
        resizeMode="contain"
        style={{
          height: 220,
          width: 270,
          position: 'absolute',
          alignSelf: 'center',
          marginTop: dW(50),
        }}
        source={images.tutorialsblue}></ImageBackground>
      <ImageBackground
        resizeMode="contain"
        style={style.back_tut}
        source={images.tutorialsblack}></ImageBackground>

      <Text style={style.tut}>TUTORIALS</Text>
      <Text style={style.explore}>
        Explore in-depth product tutorials to learn how to use your equipment
        efficiently.
      </Text>
    </View>
  );
};
export default TutorialsWalkThrough;
