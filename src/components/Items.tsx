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
import ItemsLane from './ItemsLane';
const Items = ({heading, data, onClick, horizontal, viewAll, viewAllClick}) => {
  const style = useStyle();
  return (
    <View style={style.items_inn}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={style.heading__}>{heading}</Text>
        {viewAll && (
          <Text
            onPress={() => viewAllClick()}
            style={style.heading__viewall}>{`View All`}</Text>
        )}
      </View>
      <FlatList
        contentContainerStyle={{
          marginVertical: 7,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={horizontal ? horizontal : true}
        renderItem={({item}) => (
          <ItemsLane
            viewAll
            //  estyle={{marginTop: 10}}
            onClick={onClick}
            data={item}></ItemsLane>
        )}></FlatList>
    </View>
  );
};
export default Items;
