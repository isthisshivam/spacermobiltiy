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
const StoreWalkThrough = ({heading, onClick, e_style}) => {
  const style = useStyle();
  return (
    <View style={style.walk_lane}>
      <ImageBackground
        resizeMode="contain"
        style={{
          height: 210,
          width: '100%',
          position: 'absolute',
          alignSelf: 'center',
          marginTop: dW(40),
        }}
        source={images.storeblue}></ImageBackground>
      <ImageBackground
        resizeMode="contain"
        style={style.walk_img}
        source={images.store}></ImageBackground>
      <View style={{paddingHorizontal: 30}}>
        <Text style={style.store_n}>STORE</Text>
        <Text style={style.browse}>
          Browse our in-app online store to access all of your mobility tools
          and resource needs.
        </Text>
      </View>
    </View>
  );
};
export default StoreWalkThrough;
