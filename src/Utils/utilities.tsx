import {createContext} from 'react';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
export const IApContext = createContext();

export const navigateToClass = (screenName, params) => {
  const {navigate} = useNavigation();
  navigate(screenName, params);
};

export const navigateTo = (screenName, params, navigation) => {
  navigation.navigate(screenName, params);
};
export const authLogs = code => {
  let errorMessage = '';
  switch (code) {
    case 'auth/wrong-password':
      errorMessage = 'Your password is wrong.';
      break;
    case 'auth/too-many-requests':
      errorMessage = 'Your attemp too many time please try after sometime';
      break;
    case 'auth/user-not-found':
      errorMessage = "User with this email doesn't exist.";
      break;

    default:
      errorMessage = 'Something went wrong please try after sometime.';
  }
  return errorMessage;
};

export const validateEmail = text => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
};
export const validateNumber = num => {
  const reg = /^[0-9\b]+$/;
  return reg.test(num);
};

export const extractVideoId = url => {
  if (url) {
    let data = url.split('/');
    if (data) {
      console.log('extractVideoId=', data[data.length - 1]);
      return data[data.length - 1];
    }
  }
};
export const showToastMessage = message => {
  setTimeout(() => {
    Toast.show(message, Toast.SHORT);
  }, 100);
};

export const resetStack = (route, param, navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: route, params: param}],
    }),
  );
};
export const requestAndroidCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'Spacer needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('Camera granted==', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const track = async (name, payload) => {
  console.log(JSON.stringify(global.branchIo));
  if (global.branchIo) {
    global.branchIo.logEvent(name, {
      customData: payload,
    });
  } else {
    console.log('track not initalize yet...');
  }
};
export const setItem = async (ID, value) => {
  try {
    await AsyncStorage.setItem(ID, value);
  } catch (e) {}
};
export const SaveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('ERROR======', e);
  }
};
export const hasWhiteSpace = async s => {
  //return /\s/g.test(s);
  return s.indexOf(' ') >= 0;
};
export const isEmpty = item_to_check => {
  if (
    item_to_check == null ||
    item_to_check == undefined ||
    item_to_check == '' ||
    item_to_check == 'null'
  )
    return true;
  else return false;
};
export const isEmptyString = item_to_check => {
  if (item_to_check == '') return true;
  else return false;
};
export const isEmail = email => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );

  return pattern.test(email);
};
export const getStoreData = async Key_to_be_fetched => {
  try {
    const value = await AsyncStorage.getItem(Key_to_be_fetched);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('ERROR IN FETCHING ASYNC STORAGE DATA');
    return null;
  }
};

export const setStoreData = async (Key_to_be_paired, data_to_save) => {
  try {
    console.log(
      'STORING DATA',
      Key_to_be_paired,
      'data_to_save=',
      data_to_save,
    );
    const value = await AsyncStorage.setItem(
      Key_to_be_paired,
      JSON.stringify(data_to_save),
    );
  } catch (e) {
    console.log('ERROR WHILE STORING  DATA', e);
  }
};

export const removeStoreData = async Key_to_be_removed => {
  try {
    await AsyncStorage.removeItem(Key_to_be_removed);
  } catch (e) {
    console.log('ERROR WHILE REMOVING  DATA', e);
  }
};
