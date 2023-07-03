import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, ImageBackground, Modal} from 'react-native';
import images from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import useStyle from '../constants/style';
import LogoutModal from './LogoutModal';
import {removeStoreData, resetStack} from '../Utils/utilities';
const Drawer_Content = ({props}) => {
  const navigation = useNavigation();
  const styles = useStyle();
  const [isVisible, setVisible] = useState(false);

  const logout = async () => {
    await removeStoreData('LOGGEDIN_USER');
    setVisible(false);
    resetStack('AuthStack', null, navigation);
  };
  function navigateToWalkThrough() {
    navigation.navigate('AuthStack', {
      screen: 'WalkThrough',
    });
  }
  function messageus() {
    navigation.navigate('Chat');
  }
  return (
    <View style={styles.drawer}>
      <LogoutModal
        isVisible={isVisible}
        canclePress={() => setVisible(false)}
        logoutPress={() => logout()}
      />
      <ImageBackground
        resizeMode="contain"
        style={styles.curve__}
        source={images.curve}></ImageBackground>
      <View style={styles.inner}>
        <Text
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.edit}>
          Edit Profile
        </Text>
        <Text onPress={messageus} style={styles.messageus}>
          Message Us
        </Text>
        <Text onPress={navigateToWalkThrough} style={styles.messageus}>
          Walkthrough
        </Text>
        <Text onPress={() => [setVisible(true)]} style={styles.messageus}>
          Log out
        </Text>
      </View>
    </View>
  );
};

export default Drawer_Content;
