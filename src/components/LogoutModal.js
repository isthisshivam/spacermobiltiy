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
  Modal,
  Alert,
} from 'react-native';
import useStyle from '../screens/Profile/style';
import colors from '../constants/colors';
import images from '../assets/images';
const LogoutModal = ({canclePress, logoutPress, isVisible}) => {
  const style = useStyle();
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={style.contane}>
        <Text style={style.logout}>Loggin out?</Text>
        <Text style={style.miss}>We will miss you!</Text>
        <View style={style.visible}>
          <TouchableOpacity
            onPress={() => [logoutPress()]}
            style={style.logout_}>
            <Text style={[style.cancle, {color: colors.white}]}>LOGOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => canclePress()} style={style.invisi}>
            <Text style={style.cancle}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default LogoutModal;
