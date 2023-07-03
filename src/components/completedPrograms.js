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
import useStyle from '../constants/style';
import {windowHeight, windowWidth} from '../Utils/dynamicHeightWidth';
import CompletedProgramsItemsLane from './completedProgramsItemLane';
const CompletedItems = ({data, onClick}) => {
  const style = useStyle();
  const EmptyComponent = () => {
    return (
      <View style={style.emptyView}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            lineHeight: 25,
            letterSpacing: 1,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          No Programs{' '}
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      style={{marginTop: 7}}
      showsHorizontalScrollIndicator={false}
      data={data}
      ListEmptyComponent={<EmptyComponent />}
      renderItem={({item}) => (
        <CompletedProgramsItemsLane
          estyle={{marginTop: 10}}
          onClick={onClick}
          data={item}></CompletedProgramsItemsLane>
      )}></FlatList>
  );
};
export default CompletedItems;
