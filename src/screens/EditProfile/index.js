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
  ActivityIndicator,
} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import PrimaryButton from '../../components/PrimaryButton';
import {dH, dW, windowWidth, showToastMessage} from '../../Utils/utilities';
import colors from '../../constants/colors';
import EditProfileLane from '../../components/EditProfileLane';
import Lanes from '../../components/Lanes';
import firebase from '@react-native-firebase/app';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import ProductHeader from '../../components/ProductHeader';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerBottomSheet from '../../components/ImagePickerBottomSheet';
import storage from '@react-native-firebase/storage';
var formatDate = null;
var userDetails = null;
const EditProfile = props => {
  console.log('props=', JSON.stringify(props));

  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const refRBSheet = useRef();
  const [userImage, setUserImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('John');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .onSnapshot(querySnapshot => {
        userDetails = querySnapshot?._data;
        console.log('querySnapshot', querySnapshot?._data?.formatDate);
        setEmail(querySnapshot?._data?.email);
        setBirthDate(querySnapshot?._data?.birthDate);
        setUserName(querySnapshot?._data?.displayName);
        setUserImage(querySnapshot?._data?.profile);
        setGender(querySnapshot?._data?.gender);
        formatDate = querySnapshot?._data?.formatDate;
        setLoading(false);
      });
  };

  const onUpdateProfilePress = () => {
    refRBSheet.current.open();
  };
  useEffect(() => {
    pullUserPersonalInfo();
  }, []);
  const pickORCapture = TYPE => {
    refRBSheet.current.open();
    if (TYPE == 'CAMERA') {
      ImagePicker.openCamera({
        width: 400,
        height: 300,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 400,
        compressImageMaxHeight: 300,
      })
        .then(image => {
          refRBSheet.current.close();
          generateImage(image);
        })
        .catch(e => {
          console.log(JSON.stringify(e.message));
        });
    } else if (TYPE == 'GALLERY') {
      ImagePicker.openPicker({
        width: 400,
        height: 300,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.8,
        compressImageMaxWidth: 400,
        compressImageMaxHeight: 300,
      })
        .then(image => {
          refRBSheet.current.close();
          generateImage(image);
        })
        .catch(e => {
          console.log(JSON.stringify(e.message));
          refRBSheet.current.close();
        });
    }
  };
  const generateImage = async data => {
    const localUri = data.path;
    const filename = localUri.split('/').pop();
    let fileType = data.mime;
    const File = {
      uri: localUri,
      name: filename,
      type: fileType,
    };
    console.log('localUri', data);

    uploadFileToFirebaseStorage(localUri, filename);
  };
  const uploadFileToFirebaseStorage = (path, imageName) => {
    setLoadingImage(true);
    let reference = storage().ref(imageName);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log(`${imageName} has been successfully uploaded.`);
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
          .getDownloadURL()
          .then(url => {
            console.log(`${imageName} has been downloaded uploaded.`, url);
            setUserImage(url);
            setTimeout(() => {
              setLoadingImage(false);
              updateUserImage(url);
            }, 2000);
          })
          .catch(e => {
            //  setLoading(false);
            console.log('getting downloadURL of image error => ', e);
          });
      })
      .catch(e => console.log('uploading image error => ', e));
  };
  const updateUserImage = async link => {
    console.log('pushUserPersonalInfo.payload', {
      ...userDetails,
      profile: link,
    });
    // setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .set({
        ...userDetails,
        profile: link,
      })
      .then(res => {
        console.log('updateUserImage.success', res);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 500);
      })
      .catch(e => {
        console.log('updateUserImage.catch', e);
        setLoading(false);
      });
  };
  const onSaveClick = () => {
    setLoading(true);
    setTimeout(() => {
      showToastMessage('Profile has been Updated');
      setLoading(false);
      navigation.navigate('Home');
    }, 1000);
  };

  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <ProductHeader heading={'Edit Profile'} />
      <Loader isLoading={loading || loadingImage}></Loader>
      <ImagePickerBottomSheet
        openCamera={() => pickORCapture('CAMERA')}
        openFiles={() => pickORCapture('GALLERY')}
        reference={refRBSheet}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={style.kawasaki_}>
          {loadingImage ? (
            <View style={style.view}>
              <ActivityIndicator
                animating={loadingImage}
                color={colors.primary}
                size={'small'}></ActivityIndicator>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 10,
                  marginTop: 4,
                  color: colors.primary,
                }}>
                Uploading...
              </Text>
            </View>
          ) : (
            <Image style={style.dumm} source={{uri: userImage}}></Image>
          )}

          <Text
            onPress={onUpdateProfilePress}
            numberOfLines={1}
            style={[style.ground1, {marginTop: 3}]}>
            CHANGE PHOTO
          </Text>
        </View>
        <View style={style.acess_}>
          <EditProfileLane
            color={colors.black}
            onClick={() =>
              navigation.navigate('EditField', {
                name: 'Edit Name',
                type: 'NAME',
                value: username,
                typeDate: '',
              })
            }
            heading={username}></EditProfileLane>
          <EditProfileLane
            color={colors.gray}
            onClick={() => navigation.navigate('EditProfile')}
            heading={email}></EditProfileLane>
          <EditProfileLane
            color={colors.gray}
            onClick={() => navigation.navigate('EditProfile')}
            heading={'********'}></EditProfileLane>
          <EditProfileLane
            color={colors.black}
            onClick={() =>
              navigation.navigate('EditField', {
                name: 'Edit Gender',
                type: 'GENDER',
                value: gender,
                typeDate: '',
              })
            }
            heading={gender}></EditProfileLane>
          <EditProfileLane
            color={colors.black}
            onClick={() =>
              navigation.navigate('EditField', {
                name: 'Edit Birthday',
                type: 'DATE',
                value: birthDate,
                typeDate: formatDate,
              })
            }
            heading={birthDate}></EditProfileLane>
          <PrimaryButton
            onClick={() => onSaveClick()}
            e_style={{width: '100%', marginTop: 100}}
            heading={'SAVE CHANGES'}></PrimaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
