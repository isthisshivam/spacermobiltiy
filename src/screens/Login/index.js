import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import usePallete from '../../assets/Pallete';
import images from '../../assets/images';
import {dW, dH} from '../../Utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import PrimaryButton from '../../components/PrimaryButton';
import useStyle from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  showToastMessage,
  isEmail,
  isEmpty,
  getStoreData,
  setStoreData,
  authLogs,
} from '../../Utils/utilities';
import firebase from '@react-native-firebase/app';
import Loader from '../../components/Loader';

const Login = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    var message = '';
    if (isEmpty(email)) {
      message = 'Please enter email!';
    } else if (!isEmail(email)) {
      message = 'Please enter valid email!';
    } else if (isEmpty(password)) {
      message = 'Please enter password';
    } else if (password < 6) {
      message = 'Please enter atleast six digit password!';
    }

    if (message == '') {
      return true;
    }
    showToastMessage(message);
    return false;
  }
  const login = async () => {
    if (validate()) {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(useinfo => {
          saveUserInfo(useinfo);
          console.log(useinfo);
          console.log('User logged-in successfully!');
        })
        .catch(error => {
          setLoading(false);
          console.log('error==', error.code);
          showToastMessage(authLogs(error.code));
        });
    }
  };
  const saveUserInfo = async useinfo => {
    global.Uid = useinfo?.user?.uid;
    await setStoreData('LOGGEDIN_USER', useinfo);
    setLoading(false);
    // navigation.navigate('HomeStack', {
    //   screen: 'Home',
    // });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: `HomeStack`}],
      }),
    );
    // navigation.reset('HomeStack', {
    //   index: 0,
    //   routes: [{name: 'Home'}],
    // });
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Loader isLoading={loading}></Loader>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <ImageBackground
          style={style.header_img}
          resizeMode="contain"
          source={images.logo}></ImageBackground>
        <View style={{paddingHorizontal: 20}}>
          <Text style={style.welcome_back}>Welcome back</Text>

          <TextInput
            placeholderTextColor={colors.gray}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={style.input}></TextInput>
          <TextInput
            placeholderTextColor={colors.gray}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Password (Min 8 Char)"
            style={style.input}></TextInput>
          <PrimaryButton
            e_style={{marginTop: dH(30)}}
            heading={'SIGN IN'}
            onClick={() => login()}></PrimaryButton>

          <Text
            onPress={() => navigation.navigate('ForgotPassword')}
            style={style.forgot}>
            Forgot Password?
          </Text>
          <Text style={style.have_acc}>
            Dont have an account?
            <Text
              onPress={() => navigation.navigate('Register')}
              style={style.new_one}>
              {` Create one`}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Login;
