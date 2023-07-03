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
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import {resetStack, showToastMessage} from '../../Utils/utilities';
import colors from '../../constants/colors';
import DrawerHeader from '../../components/DrawerHeader';
import Lanes from '../../components/Lanes';
import {removeStoreData} from '../../Utils/utilities';
import LogoutModal from '../../components/LogoutModal';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Profile = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [userImage, setUserImage] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profile, setProfile] = useState(null);
  const [isVisibleDelete, setVisibleDelete] = useState(false);

  useEffect(() => {
    pullUserPersonalInfo();
  }, []);
  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          setBirthDate(querySnapshot?._data?.birthDate);
          setUserName(querySnapshot?._data?.displayName);
          setUserImage(querySnapshot?._data?.profile);
        }
        setLoading(false);
      });
  };

  const logout = async () => {
    await removeStoreData('LOGGEDIN_USER');
    setVisible(false);
    resetStack('AuthStack', null, navigation);
  };
  const deleteAccount = async () => {
    await removeStoreData('LOGGEDIN_USER');
    await auth().currentUser.delete();
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .delete()
      .then(() => {
        showToastMessage('Account deleted successfully');
        setVisible(false);

        setTimeout(() => {
          resetStack('AuthStack', null, navigation);
        }, 1000);
      })
      .catch(e => {
        showToastMessage(e?.message);
      });
  };

  const DeleteModal = () => {
    return (
      <Modal visible={isVisibleDelete} transparent={true}>
        <View style={style.contaner}>
          <Loader isLoading={loading}></Loader>
          <Text style={style.logout}>
            Are you sure you want to delete your account?
          </Text>
          <Text style={style.miss}>You won’t be able to get it back.</Text>
          <View style={style.visible}>
            <TouchableOpacity
              onPress={() => [deleteAccount()]}
              style={style.logout_}>
              <Text style={[style.cancle, {color: colors.white}]}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisibleDelete(false)}
              style={style.invisi}>
              <Text style={style.cancle}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <DrawerHeader
        onClick={() => props?.navigation?.openDrawer()}
        backgroundColor={colors.profileback}
      />
      <Loader isLoading={loading}></Loader>
      <LogoutModal
        isVisible={isVisible}
        canclePress={() => setVisible(false)}
        logoutPress={() => logout()}
      />
      <DeleteModal />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 0}}>
        <View style={style.scroll}>
          <Image style={style.scroll_img} source={{uri: userImage}}></Image>
          <Text numberOfLines={1} style={[style.recovery, {marginTop: 10}]}>
            {name}
          </Text>
          <Text numberOfLines={1} style={[style.ground1, {marginTop: 3}]}>
            {birthDate}
          </Text>
        </View>
        <View style={style.pading}>
          <Lanes
            icon={images.share}
            onClick={() => navigation.navigate('Products')}
            content={'Purchased / Saved'}></Lanes>
          <Lanes
            icon={images.account}
            onClick={() => navigation.navigate('EditProfile')}
            content={'Edit Profile'}></Lanes>
          <Lanes
            onClick={() => navigation.navigate('CompletedPrograms')}
            icon={images.leaf}
            content={'Completed Programs'}></Lanes>
          <Lanes
            onClick={() => navigation.navigate('Chat')}
            icon={images.leaf}
            content={'Message Us'}></Lanes>
          <Lanes
            icon={images.deleteAccount}
            onClick={() => setVisibleDelete(true)}
            content={'Delete Account'}></Lanes>
          <Lanes
            icon={images.logout}
            onClick={() => setVisible(true)}
            content={'Log out'}></Lanes>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
