import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import images from '../assets/images';
import {Vimeo} from 'react-native-vimeo-iframe';
import colors from '../constants/colors';
import {extractVideoId} from '../Utils/utilities';
import useStyle from '../screens/ProgramDetails/style';
import {windowWidth} from '../Utils/dynamicHeightWidth';
const MobilityExpandableComponent = ({item, onClickFunction, isExpanded}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const styles = useStyle();
  useEffect(() => {
    if (isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header11}>
        <View style={styles.tou}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={[
                styles.headerText1,
                {
                  color: colors.primary,
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 17,
                },
              ]}>
              {'Day1:'}
              <Text style={[styles.headerText1, {color: colors.gray}]}>
                {' Mobility Streching'}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.data}>
          <ImageBackground
            resizeMode="contain"
            style={[styles.dataaa, {transform: [{rotate: '180deg'}]}]}
            source={images.back}></ImageBackground>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        <TouchableOpacity key={item.id} style={styles.content}>
          <View style={styles.flex3}></View>
          <View style={styles.flex7}>
            <Vimeo
              style={{
                alignSelf: 'flex-end',
                height: 160,
                width: '100%',
                resizeMode: 'cover',
                width: windowWidth() - 100,
                borderRadius: 10,
                marginTop: 10,
                marginRight: 10,
              }}
              videoId={extractVideoId(item?.videoUrl)}
              params={'api=1&autoplay=0'}
              //handlers={videoCallbacks}
            />
            <Text style={styles.text}>{item?.description}</Text>
          </View>

          <View style={styles.separator} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MobilityExpandableComponent;
