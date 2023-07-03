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
import {requestPurchase, useIAP} from 'react-native-iap';
{
  /* {data?.programs?.VideoThumbnail == '' && (
            <ImageBackground
              source={images.letsee}
              borderRadius={5}
              style={[
                {alignSelf: 'center', height: 120, width: 140},
              ]}></ImageBackground>
          )} */
}
const ItemsLane = ({data, onClick, estyle}) => {
  const style = useStyle();
  if (data?.programs) {
    return (
      <TouchableOpacity
        onPress={() => [onClick(data?.id, data?.programs?.sku_id)]}
        style={style.item_lane}>
        <ImageBackground
          resizeMode={
            data?.programs?.VideoThumbnail == '' ? 'contain' : 'cover'
          }
          source={{uri: data?.programs?.VideoThumbnail}}
          borderRadius={5}
          style={[style.image_main]}>
          {data?.programs?.VideoThumbnail == '' && (
            <Image
              style={{
                height: 50,
                width: 120,
                position: 'absolute',
                alignSelf: 'center',
                top: 60,
                resizeMode: 'contain',
              }}
              source={images.letsee}></Image>
          )}

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={style.items_lane_inner}>
            <Text
              numberOfLines={1}
              style={[style.heading_a4, {marginTop: 110}]}>
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
  } else if (data.products) {
    return (
      <TouchableOpacity
        onPress={() => [onClick(data?.id, data?.products?.sku_id)]}
        style={style.item_lane}>
        <ImageBackground
          resizeMode={
            data?.products?.VideoThumbnail == '' ? 'contain' : 'cover'
          }
          source={{uri: data?.products?.VideoThumbnail}}
          borderRadius={5}
          style={[style.image_main]}>
          {data?.products?.VideoThumbnail == '' && (
            <Image
              style={{
                height: 50,
                width: 120,
                position: 'absolute',
                alignSelf: 'center',
                top: 60,
                resizeMode: 'contain',
              }}
              source={images.letsee}></Image>
          )}

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={style.items_lane_inner}>
            <Text
              numberOfLines={1}
              style={[style.heading_a4, {marginTop: 110}]}>
              {data?.products?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[style.ground1, {color: colors.lightgray}]}>
              {data?.products?.description}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
};
export default ItemsLane;
