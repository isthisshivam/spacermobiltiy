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
const DrawerHeader = ({heading, onClick, e_style, backgroundColor}) => {
  const styles = useStyle();
  return (
    <View
      style={{
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: backgroundColor ? backgroundColor : 'white',
      }}>
      <TouchableOpacity style={styles.all_center} onPress={onClick}>
        <ImageBackground
          resizeMode="contain"
          style={styles.menuimg}
          source={images.menu}></ImageBackground>
      </TouchableOpacity>

      <ImageBackground
        resizeMode="contain"
        style={styles.curve_long}
        source={images.curve}></ImageBackground>
      <View style={styles.empview}></View>
    </View>
  );
};
export default DrawerHeader;
