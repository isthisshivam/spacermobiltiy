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
const ProgramsWalkThrough = ({heading, onClick, e_style}) => {
  const style = useStyle();
  return (
    <View style={style.walk}>
      {/* <ImageBackground
        resizeMode="contain"
        style={{
          height: 400,
          width: '102%',
          position: 'absolute',
          alignSelf: 'center',
          //  marginTop: dW(50),
        }}
        source={images.programback}></ImageBackground> */}
      <ImageBackground
        resizeMode="contain"
        style={style.walkImg}
        source={images.program}></ImageBackground>
      <Text style={style.program}>PROGRAMS</Text>
      <Text style={style.train}>
        Train in our targeted programs designed to build strength and mobility.
      </Text>
    </View>
  );
};
export default ProgramsWalkThrough;
