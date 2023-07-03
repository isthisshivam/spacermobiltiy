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
import {isEmail, isEmpty, showToastMessage} from '../../Utils/utilities';
import {dW, dH} from '../../Utils/dynamicHeightWidth';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import useStyle from './style';
import colors from '../../constants/colors';
import {setStoreData, getStoreData} from '../../Utils/utilities';
import firebase from '@react-native-firebase/app';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import {CommonActions} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Register = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('Select Gender');
  const [date, setDate] = useState(new Date());
  const [username, setName] = useState('');
  useEffect(() => {
    console.log('Register');
  }, []);

  function validate() {
    var message = '';
    if (isEmpty(email)) {
      message = 'Please enter email!';
    } else if (!isEmail(email)) {
      message = 'Please enter valid email!';
    } else if (isEmpty(username)) {
      message = 'Please enter name!';
    } else if (gender == 'Select Gender') {
      message = 'Please select gender!';
    } else if (gender == 'Select Gender') {
      message = 'Please select gender!';
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

  const register = async () => {
    if (validate()) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(useinfo => {
          console.log('User registered successfully!', useinfo);
          global.Uid = useinfo?.user?.uid;
          setLoading(false);
          pushUserPersonalInfo(useinfo);
        })
        .catch(error => {
          setLoading(false);
          showToastMessage(error?.message);
        });
    }
  };

  const pushUserPersonalInfo = async useinfo => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(useinfo?.user?.uid)
      .set({
        displayName: username,
        formatDate: date,
        birthDate: moment(date).format('LL'),
        email: email,
        password: password,
        gender: gender,
        profile:
          'http://52.206.87.221/backend/web/uploads/user_logo/my_default_picture.png',
        purchased_programs: [],
      })
      .then(() => {
        setLoading(false);
        saveUserInfo(useinfo);
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
        setLoading(false);
      });
  };
  const saveUserInfo = async useinfo => {
    await setStoreData('LOGGEDIN_USER', useinfo).then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: `WalkThrough`}],
        }),
      );
      // navigation.navigate('WalkThrough');
    });
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
          <Text style={style.welcome_back}>Create Account</Text>
          <TextInput
            placeholderTextColor={colors.gray}
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
            style={style.input}></TextInput>
          <TextInput
            placeholderTextColor={colors.gray}
            onChangeText={setName}
            placeholder="Name"
            value={username}
            style={style.input}></TextInput>
          <SelectDropdown
            data={['Male', 'Female', 'Rather not say', 'Other']}
            value={gender}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
            }}
            defaultButtonText={gender}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={() => {
              return <Image style={style.backimg} source={images.back} />;
            }}
            buttonStyle={style.inputqq}
            buttonTextStyle={style.dropdown4BtnTxtStyle}
            dropdownIconPosition={'right'}
            dropdownStyle={style.dropdown4DropdownStyle}
            rowStyle={style.dropdown4RowStyle}
            rowTextStyle={style.dropdown4RowTxtStyle}
          />
          <TextInput
            placeholderTextColor={colors.gray}
            onPressIn={() => setOpen(true)}
            editable={false}
            placeholder="Birth Date"
            value={moment(date).format('LL')}
            style={style.input}></TextInput>
          <DatePicker
            maximumDate={date}
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              console.log('selected date', date, moment(date).format('LL'));
              setDate(date);
            }}
            placeholder="Select Date"
            format="DD-MM-YYYY"
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TextInput
            placeholderTextColor={colors.gray}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            placeholder="Password (Min 8 Char)"
            style={style.input}></TextInput>
          <PrimaryButton
            e_style={{marginTop: dH(30)}}
            heading={'CREATE ACCOUNT'}
            onClick={() => register()}></PrimaryButton>
          <Text style={[style.have_acc, {marginTop: 40}]}>
            By creating an account you agree to the
          </Text>
          <Text style={style.tc}>Terms and Conditions and Privacy Policy</Text>
          <Text style={style.have_acc}>
            Have an account?
            <Text
              onPress={() => navigation.navigate('Login')}
              style={style.login}>
              {` Login`}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Register;
