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
import {dW, dH, windowHeight, windowWidth} from '../Utils/dynamicHeightWidth';
import useStyle from '../constants/style';
import {useNavigation} from '@react-navigation/native';
const RecommendedToolsLane = ({data, onClick}) => {
  const style = useStyle();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        onClick
          ? onClick(data?.id)
          : [navigation.navigate('ViewFullProgram', {tool_id: data.id})]
      }
      style={style.recom_lane}>
      <View style={style.rocom_lane_list_item}>
        <ImageBackground
          source={
            data?.recommended_tools?.image
              ? {uri: data?.recommended_tools?.image}
              : images.store
          }
          style={style.store}></ImageBackground>
      </View>
      <Text numberOfLines={1} style={style.ground1}>
        {data?.recommended_tools?.title}
      </Text>
    </TouchableOpacity>
  );
};
export default RecommendedToolsLane;
