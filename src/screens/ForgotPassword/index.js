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
import usePallete from '../../assets/Pallete';
import images from '../../assets/images';
import {dW, dH} from '../../Utils/dynamicHeightWidth';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import useStyle from './style';
import {
  showToastMessage,
  isEmail,
  isEmpty,
  authLogs,
} from '../../Utils/utilities';
import colors from '../../constants/colors';
import firebase from '@react-native-firebase/app';
import Loader from '../../components/Loader';
const ForgotPassword = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Login');
  }, []);
  function validate() {
    var message = '';
    if (isEmpty(email)) {
      message = 'Please enter email!';
    } else if (!isEmail(email)) {
      message = 'Please enter valid email!';
    }

    if (message == '') {
      return true;
    }
    showToastMessage(message);
    return false;
  }
  const forgotPassword = async () => {
    if (validate()) {
      setLoading(true);
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(res => {
          setLoading(false);
          showToastMessage('Email has been sent to your registered email');
          console.log('User forgot-updates successfully!', res);
        })
        .catch(error => {
          console.log('error.codes', error.code);
          setLoading(false);
          showToastMessage(authLogs(error.code));
        });
    }
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <Loader isLoading={loading}></Loader>
      <ImageBackground
        style={style.header_img}
        resizeMode="contain"
        source={images.logo}></ImageBackground>
      <View style={{paddingHorizontal: 20}}>
        <Text style={style.welcome_back}>Forgot Password </Text>

        <TextInput
          placeholderTextColor={colors.gray}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={style.input}></TextInput>

        <PrimaryButton
          e_style={{marginTop: dH(30)}}
          heading={'CONTINUE'}
          onClick={() => forgotPassword()}></PrimaryButton>

        <Text onPress={() => navigation.goBack()} style={style.forgot}>
          GoBack
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default ForgotPassword;
