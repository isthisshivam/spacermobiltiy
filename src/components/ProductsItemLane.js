import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import colors from '../constants/colors';
import images from '../assets/images';
import {dW, dH, windowHeight, windowWidth} from '../Utils/dynamicHeightWidth';
import useStyle from '../constants/style';
import LinearGradient from 'react-native-linear-gradient';
const ProductsItemsLane = ({
  data,
  onClick,
  onProgramClick,
  onMobilityClick,
}) => {
  const style = useStyle();
  if (data?.programs) {
    return (
      <Pressable
        onPress={() => onProgramClick && onProgramClick(data?.id)}
        style={style.lane_product}>
        <ImageBackground
          resizeMode={
            data?.programs?.VideoThumbnail == '' ? 'contain' : 'cover'
          }
          source={{uri: data?.programs?.VideoThumbnail}}
          borderRadius={5}
          style={[style.image_main0]}>
          <View
            style={[
              {
                position: 'absolute',
                alignSelf: 'flex-end',
                padding: 25,
                marginTop: 45,
              },
            ]}>
            <View style={style.contain_back}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  transform: [{rotate: '180deg'}],
                }}
                source={images.back}></Image>
            </View>
          </View>
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
            style={style.items_lane_inner1}>
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
            {/* <View style={style.lane_of}>
              <View style={style.contain_back}>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    transform: [{rotate: '180deg'}],
                  }}
                  source={images.back}></Image>
              </View>
            </View> */}
          </LinearGradient>
        </ImageBackground>
        {/* <ImageBackground
          resizeMode={
            data?.programs?.VideoThumbnail == '' ? 'contain' : 'cover'
          }
          source={
            data?.programs?.VideoThumbnail == ''
              ? images.letsee
              : {uri: data?.programs?.VideoThumbnail}
          }
          borderRadius={5}
          style={style.dummy}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={style.mold_view}>
            <View style={{flex: 0.8}}>
              <Text numberOfLines={1} style={style.jallus}>
                {data?.programs?.title}
              </Text>
              <Text
                numberOfLines={1}
                style={[style.ground1, {color: colors.white}]}>
                12 Week Program
              </Text>
            </View>
            <View style={style.lane_of}>
              <View style={style.contain_back}>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    transform: [{rotate: '180deg'}],
                  }}
                  source={images.back}></Image>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground> */}
      </Pressable>
    );
  } else if (data?.tools) {
    return (
      <Pressable onPress={() => onClick(data?.id)} style={style.lane_product}>
        <ImageBackground
          source={
            data?.tools ? {uri: data?.tools?.image} : {uri: data?.tools?.image}
          }
          borderRadius={5}
          style={style.dummy}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={style.mold_view}>
            <View style={{flex: 0.8}}>
              <Text numberOfLines={1} style={[style.jallus]}>
                {data?.tools?.title}
              </Text>
              <Text
                numberOfLines={1}
                style={[style.ground1, {color: colors.white}]}>
                {data?.tools?.description}
              </Text>
            </View>
            <View style={style.lane_of}>
              <View style={style.contain_back}>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    transform: [{rotate: '180deg'}],
                  }}
                  source={images.back}></Image>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  } else if (data?.mobility) {
    return (
      <Pressable
        onPress={() => onProgramClick && onProgramClick(data?.id)}
        style={style.lane_product}>
        <ImageBackground
          resizeMode={
            data?.mobility?.VideoThumbnail == '' ? 'contain' : 'cover'
          }
          source={{uri: data?.mobility?.VideoThumbnail}}
          borderRadius={5}
          style={[style.image_main0]}>
          <View
            style={[
              {
                position: 'absolute',
                alignSelf: 'flex-end',
                padding: 25,
                marginTop: 45,
              },
            ]}>
            <View style={style.contain_back}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  transform: [{rotate: '180deg'}],
                }}
                source={images.back}></Image>
            </View>
          </View>
          {data?.mobility?.VideoThumbnail == '' && (
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
            style={style.items_lane_inner1}>
            <Text
              numberOfLines={1}
              style={[style.heading_a4, {marginTop: 110}]}>
              {data?.mobility?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[style.ground1, {color: colors.lightgray}]}>
              {data?.mobility?.description}
            </Text>
          </LinearGradient>
        </ImageBackground>
        {/* <ImageBackground
        resizeMode={
          data?.programs?.VideoThumbnail == '' ? 'contain' : 'cover'
        }
        source={
          data?.programs?.VideoThumbnail == ''
            ? images.letsee
            : {uri: data?.programs?.VideoThumbnail}
        }
        borderRadius={5}
        style={style.dummy}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={style.mold_view}>
          <View style={{flex: 0.8}}>
            <Text numberOfLines={1} style={style.jallus}>
              {data?.programs?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[style.ground1, {color: colors.white}]}>
              12 Week Program
            </Text>
          </View>
          <View style={style.lane_of}>
            <View style={style.contain_back}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  transform: [{rotate: '180deg'}],
                }}
                source={images.back}></Image>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground> */}
      </Pressable>
    );
  } else if (data?.products) {
    return (
      <Pressable onPress={() => onClick(data?.id)} style={style.lane_product}>
        <ImageBackground
          resizeMode={
            data?.products?.VideoThumbnail == '' ? 'contain' : 'cover'
          }
          source={{uri: data?.products?.VideoThumbnail}}
          borderRadius={5}
          style={[style.image_main0]}>
          <View
            style={[
              {
                position: 'absolute',
                alignSelf: 'flex-end',
                padding: 25,
                marginTop: 45,
              },
            ]}>
            <View style={style.contain_back}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  transform: [{rotate: '180deg'}],
                }}
                source={images.back}></Image>
            </View>
          </View>
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
            style={style.items_lane_inner1}>
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
        {/* <ImageBackground
        resizeMode={
          data?.programs?.VideoThumbnail == '' ? 'contain' : 'cover'
        }
        source={
          data?.programs?.VideoThumbnail == ''
            ? images.letsee
            : {uri: data?.programs?.VideoThumbnail}
        }
        borderRadius={5}
        style={style.dummy}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={style.mold_view}>
          <View style={{flex: 0.8}}>
            <Text numberOfLines={1} style={style.jallus}>
              {data?.programs?.title}
            </Text>
            <Text
              numberOfLines={1}
              style={[style.ground1, {color: colors.white}]}>
              12 Week Program
            </Text>
          </View>
          <View style={style.lane_of}>
            <View style={style.contain_back}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  transform: [{rotate: '180deg'}],
                }}
                source={images.back}></Image>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground> */}
      </Pressable>
    );
  }
};
export default ProductsItemsLane;
