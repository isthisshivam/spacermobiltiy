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
import {dW} from '../Utils/dynamicHeightWidth';
import useStyle from '../constants/style';

const PrimaryButton = ({heading, onClick, e_style}) => {
  const style = useStyle();
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[style.primaryBtn, e_style && e_style]}>
      <Text style={style.btn_heading}>{heading}</Text>
    </TouchableOpacity>
  );
};
export default PrimaryButton;
