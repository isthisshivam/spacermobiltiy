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
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Messages from '../../components/Messages';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import {resetStack, showToastMessage} from '../../Utils/utilities';
import colors from '../../constants/colors';
import DrawerHeader from '../../components/DrawerHeader';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
const Chat = props => {
  const style = useStyle();
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [name, setUserName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [message, setMessage] = useState('');
  const [chatArray, setChatArray] = useState([]);
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
  const setOneToOneChat = (uid1, uid2) => {
    //Check if user1’s id is less than user2's
    if (uid1 < uid2) {
      return uid1 + '_' + uid2;
    } else {
      return uid2 + '_' + uid1;
    }
  };

  useEffect(() => {
    pullMessages();
  }, []);
  const pullMessages = async () => {
    await firestore()
      .collection('messages')
      .doc(setOneToOneChat('receiver_id', global?.Uid))
      .collection('messages_collection')
      .orderBy('created_at')
      .onSnapshot(querySnapshot => {
        const refArray = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log('refarray=', documentSnapshot.data());
          refArray.push(documentSnapshot.data());
        });
        setChatArray(refArray);
      });
  };
  const pushMessageToFireStore = async (message, type) => {
    var messageToAdd = {
      message,
      sender_id: global?.Uid,
      receiver_id: 'receiver_id',
      type: type,
      receiver_image: 'receiver_image',
      receiver_name: 'receiver_name',
      sender_name: 'global.UserInfo.first_name',
      sender_profile: 'global.UserInfo.profile',
      created_at: moment().format(), ///set current date to firestore
      is_seen: 0,
    };

    await firestore()
      .collection('messages')
      .doc(setOneToOneChat('receiver_id', global?.Uid))
      .collection('messages_collection')
      .add(messageToAdd)
      .then(() => {
        chatArray.push(messageToAdd);
        setMessage('');
        setLoading(false);
      });
    await firestore()
      .collection('messages')
      .doc('receiver_id' + `_` + global?.Uid)
      .set(messageToAdd);
  };

  return (
    <KeyboardAvoidingView
      style={[{backgroundColor: colors.blackShade_s, flex: 1}]}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      keyboardVerticalOffset={40}>
      <DrawerHeader
        onClick={() => props?.navigation?.openDrawer()}
        backgroundColor={colors.profileback}
      />
      <View style={[style.flex1]}>
        <SafeAreaProvider>
          <AutoScrollFlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.paddingHorizontal}
            enabledAutoScrollToEnd
            threshold={20}
            data={chatArray}
            renderItem={item => (
              <Messages
                receiver_image={null}
                index={item.index}
                created_at={item.item.created_at}
                type={'text'}
                sender_profile={item.item.sender_profile}
                sender_id={item.item.sender_id}
                image={item.item.receiver_image}
                message={item.item.message}
                side={
                  item.item.sender_id == global.Uid ? 'right' : 'left'
                }></Messages>
            )}
            keyExtractor={item => 'item.created_at'}
          />
          <KeyboardAvoidingView>
            <View style={style.key}>
              <TextInput
                value={message}
                onChangeText={value => setMessage(value)}
                placeholder="Write a message..."
                style={style.input}></TextInput>
              <TouchableOpacity
                onPress={() =>
                  !isLoading && message
                    ? pushMessageToFireStore(message, 'text')
                    : showToastMessage('Please enter messsage!')
                }
                style={style.touch}>
                <Text style={{color: colors.primary}}>Send</Text>
                {/* {isSent ? (
                  <Indicator isLoading={isSent}></Indicator>
                ) : (
                  <Image style={styles.send} source={images.CHAT.SEND}></Image>
                )} */}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
