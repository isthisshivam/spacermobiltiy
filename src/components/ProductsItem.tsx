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
import ProductsItemLane from './ProductsItemLane';
import LinearGradient from 'react-native-linear-gradient';
const ProductsItems = ({data, onClick, onProgramClick}) => {
  console.log('ProductsItems=', data);
  const style = useStyle();
  const emptyContainer = () => {
    return (
      <View
        style={{
          height: windowHeight() / 1.4,
          width: windowWidth(),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{color: colors.primary, fontFamily: 'Montserrat-SemiBold'}}>
          No Programs
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListEmptyComponent={emptyContainer}
        style={{marginTop: 7}}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <ProductsItemLane
            onProgramClick={onProgramClick}
            onClick={onClick}
            data={item}></ProductsItemLane>
        )}></FlatList>
    </View>
  );
};
export default ProductsItems;
