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
import useStyle from '../screens/Profile/style';

const Lanes = ({content, onClick, e_style, icon}) => {
  const navigation = useNavigation();
  const style = useStyle();

  return (
    <TouchableOpacity onPress={onClick} style={style.lane}>
      <View style={style.lane1}>
        <Image style={style.laneimg} source={icon}></Image>
        <Text numberOfLines={1} style={[style.ground2, {paddingLeft: 5}]}>
          {content}
        </Text>
      </View>
      <View style={style.lnee}>
        <Image style={style.back} source={images.back}></Image>
      </View>
    </TouchableOpacity>
  );
};
export default Lanes;
