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
import RecommendedToolsLane from './RecommendedToolsLane';
const RecommendedTools = ({heading, data, onClick}) => {
  const style = useStyle();
  return (
    <View style={style.recom}>
      {data.length > 0 && (
        <Text
          style={{
            color: colors.gray,
            fontFamily: 'Montserrat-Medium',
            fontSize: dW(16),
          }}>
          {heading}
        </Text>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal
        renderItem={({item}) => (
          <RecommendedToolsLane
            onClick={onClick}
            data={item}></RecommendedToolsLane>
        )}></FlatList>
    </View>
  );
};
export default RecommendedTools;
