import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../constants/colors';
import images from '../assets/images';
import useStyle from '../constants/style';
import LinearGradient from 'react-native-linear-gradient';
const CompletedProgramsItemsLane = ({data, onClick, estyle}) => {
  const style = useStyle();
  return (
    <TouchableOpacity
      onPress={() => onClick(data?.id)}
      style={[estyle ? [style.item_lane, estyle] : style.item_lane]}>
      <ImageBackground
        source={{uri: data?.programs?.VideoThumbnail}}
        borderRadius={5}
        style={style.image_main1}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          style={style.items_lane_inner}>
          <Text numberOfLines={1} style={[style.heading_a4, {marginTop: 110}]}>
            {data?.programs?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={[style.ground1, {color: colors.lightgray}]}>
            {data?.programs?.description}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default CompletedProgramsItemsLane;
