import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import PrimaryButton from '../../components/PrimaryButton';
import ProductHeader from '../../components/ProductHeader';

import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
var userDetails = null;
var formatDate = null;
const EditField = props => {
  const {route} = props;
  const {params} = route;
  const {name, type, value, typeDate} = params;
  formatDate = typeDate;
  const pallete = usePallete();
  const navigation = useNavigation();
  const styles = useStyle();
  const refRBSheet = useRef();
  const [date, setDate] = useState(
    formatDate ? formatDate.toDate() : new Date(),
  );
  const [username, setName] = useState(value);
  const [open, setOpen] = useState(true);
  const [gender, setGender] = useState(value);
  const [loading, setLoading] = useState(false);

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
          userDetails = querySnapshot?._data;
          console.log(
            'querySnapshot.querySnapshot',
            querySnapshot?._data?.formatDate,
          );
        }
        setLoading(false);
      });
  };

  const updateUserName = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .set({
        ...userDetails,
        displayName: username,
      })
      .then(() => {
        setLoading(false);
        navigation.navigate('EditProfile', {
          name: username,
        });
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
        setLoading(false);
      });
  };
  const updateUserGender = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .set({
        ...userDetails,
        gender: gender,
      })
      .then(res => {
        console.log('pushUserPersonalInfo.success', res);
        setLoading(false);
        navigation.navigate('EditProfile');
      })
      .catch(e => {
        console.log('pushUserPersonalInfo.catch', e);
        setLoading(false);
      });
  };
  const updateUserBirthday = async dateeee => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .set({
        ...userDetails,
        formatDate: dateeee,
        birthDate: moment(dateeee).format('LL'),
      })
      .then(res => {
        console.log('updateUserBirthday.success', res);
        setLoading(false);
        navigation.navigate('EditProfile');
      })
      .catch(e => {
        console.log('updateUserBirthday.catch', e);
        setLoading(false);
      });
  };
  const onNameSaveClick = () => {
    updateUserName();
  };
  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <ProductHeader heading={name} />
      <Loader isLoading={loading}></Loader>
      {type == 'NAME' && (
        <>
          <TextInput
            value={username}
            onChangeText={setName}
            style={styles.input1}></TextInput>
          <PrimaryButton
            onClick={() => onNameSaveClick()}
            heading={'SAVE'}></PrimaryButton>
        </>
      )}
      {type == 'DATE' && (
        <>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              console.log('selected date', moment(date).format('LL'));
              setDate(date);
              updateUserBirthday(date);
            }}
            placeholder="select date"
            format="DD-MM-YYYY"
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      )}
      {type == 'GENDER' && (
        <>
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
              return <Image style={styles.backimg} source={images.back} />;
            }}
            buttonStyle={styles.input}
            buttonTextStyle={styles.dropdown4BtnTxtStyle}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown4DropdownStyle}
            rowStyle={styles.dropdown4RowStyle}
            rowTextStyle={styles.dropdown4RowTxtStyle}
          />
          <PrimaryButton
            onClick={() => updateUserGender()}
            heading={'SAVE'}></PrimaryButton>
        </>
      )}
    </SafeAreaView>
  );
};

export default EditField;
