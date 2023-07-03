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
const EditProfileLane = ({heading, onClick, color}) => {
  const navigation = useNavigation();
  const style = useStyle();

  return (
    <TouchableOpacity onPress={onClick} style={style.editprofilelane}>
      <View style={style.editprofilelane_inner}>
        <Text
          numberOfLines={1}
          style={[style.ground2, {paddingLeft: 5, color: color, fontSize: 15}]}>
          {heading}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default EditProfileLane;
